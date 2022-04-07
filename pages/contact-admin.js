import { useState } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

export default function contactAdmin() {
    const { user } = useUser();    // to be used to properly insert profile_id field into db 
    const id = user ? user.id : null;
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const send = async (title, body) => {   // user
        try {
            setLoading(true)
            if (title === "" || body === "") throw new Error("Oggetto e corpo del messaggio devono essere entrambi compilati!")
            const { error } = await supabase
                .from("admin_requests")  // tabella con messaggi diretti all'amministrazione
                .insert({
                    profile_id: id,   // non inserisce effettivamente il profile_id nemmeno usando user al posto di profile_id
                    body: body,
                    title: title
                })
            if (error) throw error
            alert("Il tuo messaggio è stato mandato! L'amministrazione lo visualizzerà il prima possibile.")
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
            setTitle("")
            setBody("")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <span className="text-md font-bold">{"Inserisci qui un messaggio da inviare all'Aministrazione"}</span>
            <div className="flex flex-col items-center py-2">
                <p className="text-md font-thin">{"L'Amministrazione provvederà al più presto a risolvere il tuo problema."}</p>

            </div>
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
        </div>
    );
}