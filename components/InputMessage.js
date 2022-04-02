import { supabase } from "../utils/supabase";

export default function InputMessage() {
    //const { message } = ??
    /*
    function send({ message }) {
        const { data, error } = await supabase
            .from("board")
            .insert([
                { title: message.title, body: message.body }
            ])
        console.log(data, error)
    }
    */
    return (
        <div className="rounded-l py-2 px-4 font-medium">
            <div onSubmit={() => send}>
                <input className="border-b-2"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Oggetto"
                />
                <br></br>
                <input className="border-b-2"
                    type="text"
                    name="body"
                    id="body"
                    placeholder="Corpo"
                />
            </div>
            <button type="submit" className="py-4 text-sm font-medium">
                Manda il tuo messaggio
            </button>
        </div>
    )
}