import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import cookie from "cookie";
import { useUser } from "../context/user";

export default function InputMessage() {
  const [personalisedId, setPersonalisedId] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const handler = async (req, res) => {
    // MUST CHECK LOGGED USER ID = ID
    if (!!user) {
      return res.status(401).send("Non autorizzato");
    }

    // abbiamo row level security sulla tabella profile, dunque usiamo cookie per far sapere a supabase chi vuole fare il pagamento
    // cookie.parse: parse an HTTP Cookie header string and returning an object of all cookie name-value pairs. The str argument is the string representing a Cookie header value and options is an optional object containing additional parsing options.
    const token = cookie.parse(req.headers.cookie)["sb:token"];

    supabase.auth.session = () => ({
      access_token: token,
    });
  };

  const send = async (personalisedId) => {
    if (personalisedId === "")
      throw new Error("Il campo non può essere vuoto!");
    const { error } = await supabase
      .from("post")
      .update({ personalised_id: { personalisedId } })
      .eq("id", user.id);
    if (error) throw error;
    alert("Il tuo nome utente è stato modificato!");
    router.push("/board");
  };

  return (
    <div className="rounded-l py-2 px-4 font-medium">
      <div className="text-center">
        <div className="w-90 max-w-3xl mx-auto py-16 flex justify-around">
          <div className="h-auto w-64 rounded text-center shadow px-6 py-4">
            <h2 className="font-semibold text-slate-500 text-2xl">
              Cambia la tua id:
            </h2>
            <div>
              <input
                className="border-b-2"
                type="text"
                placeholder="Nome utente nuovo"
                value={personalisedId}
                onChange={(e) => setPersonalisedId(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  send(personalisedId);
                }}
                className="py-4 text-sm font-medium"
              >
                <span>Gotcha!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
