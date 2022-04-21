import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import axios from "axios";

const Context = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user());
  const router = useRouter();

  useEffect(() => {
    //quando il browser costruisce la componente react nella pagina vista dall'utente esegui la funzione getUserProfile()
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();
        if (!sessionUser.email.includes("unicam.it")) {
          //logout;
          try {
            const { error } = await supabase.from("profile").delete().match({
              email: sessionUser.email,
            });
            if (error) throw error;
          } catch (error) {
            console.error(error.message);
          }
          router.push("/invalid-email");
        } else {
          setUser({
            ...sessionUser, //prendo tutti i campi dell'utente che ha fatto login
            ...profile, //prendo tutti i campi dell'utente nella tabella profile di supabase
          });
        }
      }
    };

    getUserProfile();

    //onAuthStateChange is only executed when we log in (and not when we log out), so we need to have login and logout in out user Provider.
    supabase.auth.onAuthStateChange(() => {
      //callback
      getUserProfile();
    });
  }, []);

  useEffect(() => {
    axios.post("/api/set-supabase-cookie", {
      event: user ? "SIGNED_IN" : "SIGNED_OUT",
      session: supabase.auth.session(),
    });
  }, [user]);

  const login = async () => {
    await supabase.auth.signIn(
      {
        provider: "google",
      },
      { redirectTo: "http://localhost:3000/board" }
    );
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
