-- Create a new public bucket called 'project-assets'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-assets', 'project-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access policies
CREATE POLICY "Authenticated users can upload project assets"
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'project-assets');

CREATE POLICY "Public access to project assets"
ON storage.objects FOR SELECT TO public 
USING (bucket_id = 'project-assets');
