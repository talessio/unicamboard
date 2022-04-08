import Header from "../components/Header";
import { supabase } from "../utils/supabase";
import {
  FaRegHeart,
  FaHeart,
  FaHeartBroken,
  FaRegArrowAltCircleDown,
  FaArrowAltCircleDown,
} from "react-icons/bs";

export default function board({ messages }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Header />
      <div className="w-full border-2 border-slate-300 rounded-xl max-w-4xl flex flex-col space-y-4">
        {messages.map((message) => (
          <div
            className="rounded-xl m-8 p-8 md:p-4 shadow-sm shadow-slate-300"
            key={message.id}
          >
            <div className="flex justify-between h-24 rounded-full mx-auto">
              <span className="text-sm">Utente: anonimo</span>
              <span className="text-sm">Interazioni: {message.engagement}</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold">{message.title}</span>
            </div>
            <div className="flex flex-col items-center py-2">
              <p className="text-md font-thin">{message.body}</p>
              <button className="hover:text-pink-400 font-extrabold self-center">
                <FaRegHeart />
                <FaHeart />
                <FaHeartBroken />
                <FaRegArrowAltCircleDown />
                <FaArrowAltCircleDown />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data: messages } = await supabase.from("post").select("*");

  const sortedMessages = messages.sort((a, b) => a.engagement + b.engagement);

  return {
    props: {
      messages: sortedMessages,
    },
  };
};
