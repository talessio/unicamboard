import CookieConsent from "react-cookie-consent";

export default function CookieConsentButton() {
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="OK"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        <p>
          UniCam Board utilizza solo i cookie strettamente necessari al corretto
          funzionamento del sito.
        </p>
        <span style={{ fontSize: "15px" }}>
          L'utilizzo di Google Chrome è consigliato per un corretto
          funzionamento del sito.
        </span>
      </CookieConsent>
    </div>
  );
}
