import InputMessage from "../components/InputMessage";
import { supabase } from "../utils/supabase";
import { MessageButtons } from "../components/MessageButtons";
import { withProtected } from "../hooks/route";

function Board({ messages }) {
// export default function Board({ messages }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center py-2">
        <h1 className="font-semibold text-slate-500 text-2xl">UniCam Board</h1>
        <h2 className="text-xl">Benvenuto sulla tua bacheca.</h2>
      </div>
      <InputMessage />
      <div className="w-full max-w-4xl flex flex-col space-y-4">
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
            </div>
            <div>
              <MessageButtons message={message} />
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

export default withProtected(Board);
