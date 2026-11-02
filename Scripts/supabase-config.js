// Configuración de conexión con Supabase
const SUPABASE_URL = "https://bvgwztrbzmsudyytsbjz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8G5iSyGgJmZoHZgkDuZatg_KV6mybl5";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);