
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tksjbnbvexhbciiokksc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrc2pibmJ2ZXhoYmNpaW9ra3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjQ4ODcsImV4cCI6MjA2NjQ0MDg4N30.z8D1SOnHf2lcmERENXS47Kmi8d5u9hs7WiuSn_d9z2k'
 
import.meta.env.VITE_SUPABASE_URL ;
import.meta.env.VITE_SUPABASE_ANON_KEY ;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
        