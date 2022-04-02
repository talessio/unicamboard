import { supabase } from "../utils/supabase";

export default function InputMessage() {
    return (
        <div className="rounded-l py-2 px-4 font-medium">
            <form onSubmit={SendMessage}>
                <input className="border-b-2"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Titolo"
                />
                <br></br>
                <input className="border-b-2"
                    type="text"
                    name="body"
                    id="body"
                    placeholder="Corpo"
                />
            </form>
            <button type="submit" className="py-4 text-sm font-medium">
                Manda il tuo messaggio
            </button>
        </div>
    )
}

export function SendMessage({ message }) {
    console.log({ message })
    const send = async () => {
        const { data, error } = await supabase
            .from("board")
            .insert([
                { title: message.title, body: message.body }
            ])
        console.log(data, error)
    }
    send()
}