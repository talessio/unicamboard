import "tailwindcss/tailwind.css";
import UserProvider from "../context/user";
import Nav from "../components/Nav";
import CookieConsentButton from "../components/CookieConsentButton";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Nav />
      <Component {...pageProps} />
      <CookieConsentButton />
    </UserProvider>
  );
}

export default MyApp;
