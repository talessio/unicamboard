import CookieConsent from "react-cookie-consent";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="OK"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        UniCam Board utilizza solo i cookie strettamente necessari al corretto
        funzionamento del sito.
      </CookieConsent>
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
