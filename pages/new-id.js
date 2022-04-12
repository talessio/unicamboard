import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import cookie from "cookie";
import { useUser } from "../context/user";

const handler = async (req, res) => {
  
  // MUST CHECK LOGGED USER ID = ID
  if (!user) {
    return res.status(401).send("Non autorizzato");
  }

  // abbiamo row level security sulla tabella profile, dunque usiamo cookie per far sapere a supabase chi vuole fare il pagamento
  // cookie.parse: parse an HTTP Cookie header string and returning an object of all cookie name-value pairs. The str argument is the string representing a Cookie header value and options is an optional object containing additional parsing options.
  const token = cookie.parse(req.headers.cookie)["sb:token"];

  supabase.auth.session = () => ({
    access_token: token,
  });
};

export default handler;
