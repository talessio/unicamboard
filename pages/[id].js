import { supabase } from "../utils/supabase"
import { MessageButtons } from "../components/MessageButtons";
// import { InputReply } from "../components/InputReply";
import { useState } from "react";
import { useRouter } from "next/router"

const MessageBody = ({ message, replies }) => {
	const [body, setBody] = useState("");
	const [loading, setLoading] = useState(false);
	const [user] = useState(supabase.auth.user());
	const router = useRouter();

	console.log({ message });
	console.log({ replies });

	const handleSendReply = async (body) => {
		try {
			setLoading(true);
			if (body === "")
				throw new Error("Il corpo della risposta deve essere compilata!");
			const { error } = await supabase
				.from("reply")
				.insert({
					body: body,
					profile_id: user.id,
					post_id: message.id
				});
			if (error) throw error;
			router.push(`/${message.id}`)
		} catch (error) {
			console.error(error.message);
		} finally {
			setLoading(false);
			setBody("");
		}
	};

	return (
		<div>
			<div
				className="rounded-xl m-8 p-8 md:p-4 shadow-sm shadow-slate-300"
				key={message.id}
			>
				<div className="flex justify-between h-24 rounded-full mx-auto">
					<span className="text-sm">
						Utente: anonimo
					</span>
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
			{replies.map((reply) => (
				<div
					className="rounded-xl m-8 p-8 md:p-4 shadow-sm shadow-slate-300"
					key={message.id}
				>
					<div className="flex justify-between h-24 rounded-full mx-auto">
						<span className="text-sm">
							Utente: anonimo
						</span>
					</div>
					<div className="flex flex-col items-center py-2">
						<p className="text-md font-thin">{reply.body}</p>
					</div>
				</div>
			))}
			{/* <InputReply /> */}
			<div>
				<textarea
					placeholder="Scrivi una risposta..."
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						handleSendReply(body);
					}}
					disabled={loading}
				>
					<span>
						{loading ? "Mandando..." : "Rispondi"}
					</span>
				</button>

			</div>
		</div>
	)
}

export const getServerSideProps = async ({ params: { id } }) => {
	const { data: message } = await supabase
		.from("post")
		.select("*")
		.eq("id", id)
		.single();
	const { data: replies } = await supabase
		.from("reply")
		.select("*");
	return {
		props: {
			message,
			replies
		},
	};
};

export default MessageBody;