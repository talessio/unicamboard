import Link from "next/link"

function invalidEmail() {
    return (
        <div>
            <main className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className='font-bold text-slate-800 text-4xl'>
                    <a>Email non valida!</a>
                </h1>
                <h2 className='font-semibold text-slate-500 text-2xl'>
                    <a>Puoi accedere solo con delle email UniCam,  </a>

                    <Link href={'/'}>
                        <a>clicca qui per tornare alla Home</a>
                    </Link>

                </h2>
            </main>
        </div >
    )
}

export default invalidEmail