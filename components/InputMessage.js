export default function InputMessage() {
    return (
        <div className="border-2 rounded-l py-2 px-4 text-sm font-medium">
            <textarea defaultValue={"Inserisci qui il messaggio da mandare"}>
                
            </textarea>
            <br></br>
            <button onClick={""} className="py-4 text-sm font-medium">
                Manda
            </button>
        </div>
    )
}