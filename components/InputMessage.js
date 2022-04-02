import { supabase } from "../utils/supabase";

export default function InputMessage() {
    return (
        <div className="rounded-l py-2 px-4 font-medium">
            <form onSubmit={ SendMessage }>
                <input className="border-b-2"
                    placeholder="Titolo"
                />
                <br></br>
                <input className="border-b-2"
                    placeholder="Corpo"
                />
            </form>
            <button type="submit" className="py-4 text-sm font-medium">
                Manda il tuo messaggio
            </button>
        </div>
    )
}

const SendMessage = async () => {
    const { message, error } = await supabase
        .from("board")
        .insert([
            { title: "", body: "", engagement: 0 }
        ])
    console.log({ message })
}