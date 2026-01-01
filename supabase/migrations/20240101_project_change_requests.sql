-- Create Project Change Requests Table
CREATE TABLE public.project_change_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.project_change_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view and manage all change requests" ON public.project_change_requests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Employees can create change requests" ON public.project_change_requests
  FOR INSERT WITH CHECK (
     EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "Employees can view change requests for their projects" ON public.project_change_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id) -- Simplified for now, assuming access to project implies access to requests
  );
