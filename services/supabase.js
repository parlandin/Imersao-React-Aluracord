import { createClient } from '@supabase/supabase-js'


const baseUrl = process.env.NEXT_PUBLIC_SUPERBASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY

const supabase = createClient(baseUrl, anonKey ) 

export default supabase