import { supabase } from "../../utils/supabase";

//to tell in api routes who the supabase user is
const handler = async (req, res) => {
    await supabase.auth.api.setAuthCookie(req, res);
};

export default handler;