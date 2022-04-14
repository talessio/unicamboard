import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>UniCam Board</title>
        <meta
          name="description"
          content="La bacheca dell'Università di Camerino"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="font-bold text-slate-800 text-4xl">
          <a>UniCam Board</a>
        </h1>
        <h2 className="font-semibold text-slate-500 text-2xl">
          <a>Benvenuto nella bacheca dell'UniCam!</a>
        </h2>
      </main>

      <div className="border-y-2 border-slate-300 text-center p-5">
        <a>Un progetto Togepi</a>
      </div>
    </div>
  );
}
