import Head from 'next/head';

//fare statica
export default function Home() {

  return (
    <div>
      <Head>
        <title>UniCam Board</title>
        <meta name="description" content="La bacheca dell'Università di Camerino" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='font-bold text-slate-800 text-4xl'>
          <a>UniCam Board</a>
        </h1>
        <h2 className='font-semibold text-slate-500 text-2xl'>
          <a>Benvenuto nella bacheca dell'UniCam!</a>
        </h2>
      </main>
      <footer className='border-2 border-slate-300'>
        <a>
          Un progetto Togepi
        </a>
      </footer>
    </div>
  )
}