import Head from 'next/head';
// import { useUser } from '../context/user';
// import Link from 'next/link';

//fare statica
export default function Home() {
  // const { user } = useUser();

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
        {/* <div className="font-bold text-5xl">
          <Link href="/board">
            <a>{user ? "Accedi alla tua bacheca!" : ""}</a>
          </Link>
        </div> */}
      </main>

      <div className='border-y-2 border-slate-300 text-center p-5'>
        <a>
          Un progetto Togepi
        </a>
      </div>
    </div>
  )
}