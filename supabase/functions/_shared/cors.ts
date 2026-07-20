// Both functions are called from the browser (dev + the deployed Vercel
// site), which makes every request cross-origin relative to this function's
// own supabase.co URL. Shared so the two functions can't drift apart.
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
