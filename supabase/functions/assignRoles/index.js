import { serve } from 'https://deno.land/std@0.168.0/http/server.js'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async req => {
  const supabase = await createClient(Deno.env.get('VITE_'))
})
