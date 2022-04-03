import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function InputMessage() {

    const [loading, setLoading] = useState(false)
    const [message, setTitle] = useState("")

    const send = async (message) => {
        try {
            setLoading(true)
            if (message === "") throw new Error("Il testo è vuoto")
            const { error } = await supabase
                .from("board")  //Nome della tabella dove sarà salvato il testo
                .insert({
                    message
                })
            if (error) throw error
            alert("Il tuo messaggio è stato mandato!")
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="rounded-l py-2 px-4 font-medium">
            <div>
                <input className="border-b-2"
                    type="text"
                    placeholder="Scrivi qui..."
                    value={message}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <br></br>
            <div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        send(message)
                    }}
                    className="py-4 text-sm font-medium"
                    disabled={loading}
                >
                    <span>{loading ? "Mandando..." : "Manda"}</span>
                </button>
            </div>
        </div>
    )
}