import "tailwindcss/tailwind.css";
import UserProvider from "../context/user";
import Nav from "../components/Nav";
import Protected from "../components/Protected";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Nav />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
