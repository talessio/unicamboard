import { useState, useUser } from "react";
import { supabase } from "../utils/supabase";

export default function contactAdmin() {
    const { user } = useUser();    // to be used to properly insert profile_id field into db 
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const send = async (title, body) => {
        try {
            setLoading(true)
            if (title === "" || body === "") throw new Error("Titolo e corpo devono essere entrambi compilati!")
            const { error } = await supabase
                .from("admin_requests")  // tabella con messaggi diretti all'amministrazione
                .insert({
                    user,
                    body,
                    title
                })
            if (error) throw error
            alert("Il tuo messaggio è stato mandato! L'amministrazione provvederà il prima possibile a risolvere il tuo problema.")
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
            setTitle("")
            setBody("")
        }
    }

    return (
        // introduzione da inserire...
        <div className="rounded-l py-2 px-4 font-medium">
            <div>
                <input className="border-b-2"
                    type="text"
                    placeholder="Oggetto"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <br></br>
            <div>
                <input className="border-b-2"
                    type="text"
                    placeholder="Corpo"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        send(title, body)
                    }}
                    className="py-4 text-sm font-medium"
                    disabled={loading}
                >
                    <span>{loading ? "Mandando..." : "Manda il tuo messaggio"}</span>
                </button>
            </div>
        </div>
    );
}