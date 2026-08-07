/* ==========================================
   Y-FETISH
   supabase.js
========================================== */

const SUPABASE_URL = "https://cfdopweyymgwcgfynmbx.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_XE4slOiVMH1PLfM9spTo6g_brjnFQa6";

window.ySupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        },
        global: {
            headers: {
                "X-Client-Info": "Y-FETISH"
            }
        }
    }
);

async function getCurrentUser() {

    const {
        data,
        error
    } = await window.ySupabase.auth.getUser();

    if (error) {
        console.log(error);
        return null;
    }

    return data.user;
}
