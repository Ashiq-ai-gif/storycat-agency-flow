// deno-lint-ignore no-import-prefix
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Verify user is admin
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required')
    }

    const { title, brief, total_contents, start_date, end_date } = await req.json()

    if (!title || !total_contents || !start_date || !end_date) {
      throw new Error('Missing required fields: title, total_contents, start_date, end_date')
    }

    const start = new Date(start_date)
    const end = new Date(end_date)
    const total = parseInt(total_contents)

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || isNaN(total) || total <= 0) {
      throw new Error('Invalid date or content count')
    }

    // Initialize Admin Client for DB operations (Bypasses RLS)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create Project
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .insert({
        title,
        brief,
        total_contents: total,
        start_date,
        end_date,
        created_by: user.id
      })
      .select()
      .single()

    if (projectError) throw new Error(`Project creation failed: ${projectError.message}`)

    // Generate Dates
    const durationTime = end.getTime() - start.getTime()
    const durationDays = durationTime / (1000 * 3600 * 24)
    
    const items = []
    const step = durationDays / total

    for (let i = 0; i < total; i++) {
        const offsetDays = i * step
        const date = new Date(start.getTime() + (offsetDays * 24 * 60 * 60 * 1000))
        
        items.push({
            project_id: project.id,
            publish_date: date.toISOString().split('T')[0], // YYYY-MM-DD
            status: 'pending_dm'
        })
    }

    // Insert Content Items
    const { error: itemsError } = await supabaseAdmin
      .from('content_items')
      .insert(items)

    if (itemsError) {
        // Cleanup project
        await supabaseAdmin.from('projects').delete().eq('id', project.id)
        throw new Error(`Content generation failed: ${itemsError.message}`)
    }

    return new Response(
      JSON.stringify({ project, items_created: items.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
