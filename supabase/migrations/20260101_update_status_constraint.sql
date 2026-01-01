-- Update the check constraint to include rejection statuses
ALTER TABLE public.content_items DROP CONSTRAINT content_items_status_check;

ALTER TABLE public.content_items ADD CONSTRAINT content_items_status_check CHECK (status IN (
    'pending_dm', 
    'pending_copy', 
    'pending_copy_qc', 
    'rejected_from_copy_qc',
    'pending_design', 
    'pending_design_qc', 
    'rejected_from_design_qc',
    'completed'
));
