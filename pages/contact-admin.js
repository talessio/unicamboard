export default function contactAdmin() {
    return (
        <div className="rounded-xl m-8 p-8 md:p-4 shadow-sm shadow-slate-300">
            <div className="text-center">
                <span className="text-lg font-bold">{"Inserisci il tuo messaggio oppure contattaci a prova@example.com"}</span>
            </div>
            
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
                        disabled={loading}>
                    
                        <span>{loading ? "Mandando..." : "Manda"}</span>
                    </button>
                </div>
            </div>


        </div>

    );
}