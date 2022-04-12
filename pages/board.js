import Header from "../components/Header"
import { supabase } from "../utils/supabase";
import { BsSuitHeart } from "react-icons/bs";

export default function board({ posts }) {
    console.log(posts);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Header />
            <div className="w-full border-2 border-slate-300 rounded-xl max-w-4xl flex flex-col space-y-4">
                {posts.map((post) => (
                    <div className="rounded-xl m-8 p-8 md:p-4 shadow-sm shadow-slate-300" key={post.engagement}>
                        <div className="flex justify-between h-24 rounded-full mx-auto">
                            <span className="text-sm">Utente: {post.user_id}</span>
                            <span className="text-sm">Interazioni: {post.engagement}</span>
                        </div>
                        <div className="text-center">
                            <span className="text-lg font-bold">{post.title}</span>
                        </div>
                        <div className="flex flex-col items-center py-2">
                            <p className="text-md font-thin">{post.body}</p>
                            <button className="hover:text-pink-400 font-extrabold self-center">
                                <BsSuitHeart />
                            </button>
                        </div>
                    </div>
                ))}
            </div >
        </div>
    );
}

export const getServerSideProps = async () => {
    const { data: posts } = await supabase.from("post").select("*")

    const sortedposts = posts.sort((a, b) => a.engagement + b.engagement);

    return {
        props: {
            posts: sortedposts,
        }
    }
}