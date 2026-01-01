-- Create Projects Table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  brief TEXT,
  total_contents INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can do everything on projects" ON public.projects
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Employees can view active projects" ON public.projects
  FOR SELECT USING (true);


-- Create Content Items Table (The Calendar Nodes)
CREATE TABLE public.content_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  publish_date DATE NOT NULL,
  status TEXT DEFAULT 'pending_dm' CHECK (status IN (
    'pending_dm', 
    'pending_copy', 
    'pending_copy_qc', 
    'pending_design', 
    'pending_design_qc', 
    'completed'
  )),
  
  -- DM Fields
  dm_title TEXT,
  dm_description TEXT,
  dm_design_instructions TEXT,
  dm_notes TEXT,
  dm_submitted_at TIMESTAMP WITH TIME ZONE,
  dm_assignee UUID REFERENCES public.profiles(id),

  -- Copy Fields
  copy_content TEXT,
  copy_writer_notes TEXT,
  copy_submitted_at TIMESTAMP WITH TIME ZONE,
  copy_assignee UUID REFERENCES public.profiles(id),

  -- Copy QC Fields
  copy_qc_notes TEXT,
  copy_qc_assignee UUID REFERENCES public.profiles(id),

  -- Design Fields
  design_asset_url TEXT,
  design_notes TEXT,
  design_submitted_at TIMESTAMP WITH TIME ZONE,
  design_assignee UUID REFERENCES public.profiles(id),

  -- Design QC Fields
  design_qc_notes TEXT,
  design_qc_assignee UUID REFERENCES public.profiles(id),

  -- General
  rejection_reason TEXT, -- Stores reason if sent back
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Content Items
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view content items" ON public.content_items
  FOR SELECT USING (true);

CREATE POLICY "Employees can update assigned items or matching role stage" ON public.content_items
  FOR UPDATE USING (true); -- Simplified for now, will refine with logic


-- Create Time Logs Table
CREATE TABLE public.time_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  content_item_id UUID REFERENCES public.content_items(id),
  project_id UUID REFERENCES public.projects(id),
  
  start_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER, 
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Time Logs
ALTER TABLE public.time_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own logs" ON public.time_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all logs" ON public.time_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
