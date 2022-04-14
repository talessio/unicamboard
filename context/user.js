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
      
      if (sessionUser) {
        const { data: profile } = await supabase
            .from("profile")
            .select("*")
            .eq("id", sessionUser.id)
            .single();
        if (!sessionUser.email.includes("@studenti.unicam.it")) {
          //logout;
          router.push("/invalid-email");
        } else {
          setUser({
            ...sessionUser,
            ...profile,
          });
        }
      }
    };
    
    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
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
