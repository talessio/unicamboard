import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import cookie from "cookie";

export default function InputMessage() {

    const [loading, setLoading] = useState(false);
    const [personalisedId, setPersonalisedId] = useState("");
    const { user } = await supabase.auth.api.getUserByCookie(req);
    const router = useRouter();

    // MUST CHECK LOGGED USER ID = ID
    // if (!user) {
    //     return res.status(401).send('Non autorizzato');
    // };

    // //abbiamo row level security sulla tabella profile, dunque usiamo cookie per far sapere a supabase chi vuole fare il pagamento
    // const token = cookie.parse(req.headers.cookie)['sb:token'];

    // supabase.auth.session = () => ({
    //     access_token: token,
    // });

    const send = async (personalisedId) => {
        try {
            setLoading(true)
            if (personalisedId === "") throw new Error("Il campo non può essere vuoto!")
            const { error } = await supabase
                .from("post")
                .update({ personalised_id: { personalisedId } })
                .eq("id", user.id);
            if (error) throw error
            alert("Il tuo nome utente è stato modificato!")
        } catch (error) {
            alert(error.message)
        }
        router.push("/board");
    }

    return (
        <div className="rounded-l py-2 px-4 font-medium">
            <div>
                <input className="border-b-2"
                    type="text"
                    placeholder="Nome utente nuovo"
                    value={personalisedId}
                    onChange={(e) => setPersonalisedId(e.target.value)}
                />
            </div>
            <div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        send(personalisedId)
                    }}
                    className="py-4 text-sm font-medium"
                    disabled={loading}
                >
                    <span>Gotcha!</span>
                </button>
            </div>
        </div>
    )
}