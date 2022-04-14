import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import axios from "axios";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(supabase.auth.user());

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      /**
       * Provare a controllare che la mail sia corretta prima di restituire un oggetto user,
       * se una mail non e' valida non dovremmo eseguire per niente supabase.auth.user();
       *
       * QUI UTENTE GIA' LOGGATO
       */
      if (sessionUser) {
        console.log("user ", sessionUser.email.toString(), " logged");
        if (sessionUser.email.includes("@studenti.unicam.it")) {
          console.log("correct email: ", sessionUser.email.toString());
          // controllo email
          const { data: profile } = await supabase
            .from("profile")
            .select("*")
            .eq("id", sessionUser.id)
            .single();
          setUser({
            ...sessionUser,
            ...profile,
          });
          router.push("/board"); // todo sostituire con quello di ale
        } else {
          logout;
          console.log("Only Unicam email are allowed!");
          //redirectTo: "http://localhost:3000/invalid-email";
          router.push("/invalid-email"); // todo sostituire con quello di ale
        }
      }
    };
    
    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  useEffect(() => {
    // QUI
    console.log("check axios.post")
    //if (email.includes("@studenti.unicam.it")) {
      axios.post("/api/set-supabase-cookie", {
        event: user ? "SIGNED_IN" : "SIGNED_OUT",
        session: supabase.auth.session(),
      });
    // oppure qua
  }, [user]);

  const login = async () => {
    console.log("logging in by OAuth");
    await supabase.auth.signIn({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const exposed = {
    user,
    login,
    logout,
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
