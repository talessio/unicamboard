import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

const chooseNewId = () => {
  const { user } = useUser();
  const router = useRouter();
  const [Id, setId] = useState("");
  // const userId = user ? user.id : null;

  const send = async (personalisedId) => {
    if (personalisedId === "") {
      alert("Il campo non può essere vuoto!");
      return;
    }
    const { data } = await supabase
      .from("public.profile")
      .update({ personalised_id: personalisedId })
      .eq("id", user.id);
    console.log(data);
    if (data) alert("Si è verificato un errore");
    else {
      alert("Il tuo nome utente è stato modificato!");
      router.push("/board");
    }
  };

  return (
    <div className="rounded-l py-2 px-4 font-medium">
      <div className="text-center">
        <div className="w-90 max-w-3xl mx-auto py-16 flex justify-around">
          <div className="h-auto w-64 rounded text-center shadow px-6 py-4">
            <h2 className="font-semibold text-slate-500 text-2xl">
              Cambia la tua id:
            </h2>
            <div className="py-5">
              <input
                className="border-b-2"
                type="text"
                value={Id}
                placeholder="Nome utente"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  send(Id);
                }}
                className="py-4 text-sm font-medium"
              >
                <span className="p-4 border-2 rounded-xl border-slate-300 text-sm font-medium">
                  Gotcha!
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chooseNewId;
