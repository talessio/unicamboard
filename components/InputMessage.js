import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function InputMessage() {

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const send = async (title, body) => {
        try {
            setLoading(true)
            const { error } = await supabase
                .from("board")
                .insert({
                    title,
                    body
                })
            if (error) throw error
            alert("Il tuo messaggio è stato mandato!")
        } catch (error) {
            alert("Si è verificato un errore, riprova")
        } finally {
            setLoading(false)
        }
    }

    return (
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
            <br></br>
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
    )
}