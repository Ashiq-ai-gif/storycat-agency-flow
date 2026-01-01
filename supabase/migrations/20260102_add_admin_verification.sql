-- Add admin verification fields to content_items
ALTER TABLE public.content_items ADD COLUMN IF NOT EXISTS is_admin_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE public.content_items ADD COLUMN IF NOT EXISTS admin_verified_at TIMESTAMP WITH TIME ZONE;
