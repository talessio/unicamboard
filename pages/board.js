// import styles from '../styles/Home.module.css';
import Nav from "../components/Nav";
import NavItem from "../components/NavItem";
import Header from "../components/Header"
import { supabase } from "../utils/supabase";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

export default function board({ messages }) {
    console.log(messages);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Nav>
                <NavItem href="" isActive>Home</NavItem>
                <NavItem href="">Account</NavItem>
                <NavItem href="">Logout</NavItem>
            </Nav>
            <Header />
            <div className="w-full border-2 border-slate-300 rounded-xl max-w-4xl flex flex-col space-y-4">
                {messages.map((message) => (
                    // <button className="m-5 w-fill rounded-xl shadow-md shadow-slate-200 items-stretch space-y-2 flex-col" key={message.engagement}>
                    <div className="rounded-xl m-8 p-8 md:p-4 shadow-sm shadow-slate-300" key={message.engagement}>
                        <div className="flex justify-between h-24 rounded-full mx-auto">
                            <span className="text-sm">Utente: {message.user_id}</span>
                        </div>
                        <div className="text-center">
                            <span className="text-lg font-bold">Titolo: {message.title}</span>
                        </div>
                        {/* <div className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto">
                            <p className="text-sm" >{message.user_id}</p>
                            <p className="text-lg font-bold">{message.title}</p>
                        </div> */}
                        <div className="flex flex-col items-center py-2">
                            <p className="text-md font-thin">{message.body}</p>
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
    const { data: messages } = await supabase.from("board").select("*")

    return {
        props: {
            messages,
        }
    }
}

// export async function numOfNewPosts (

// )

// export const getStaticProps = async () => {
//     const { data: messages } = await supabase.from("board").select("*")

//     return {
//         props: { messages },
//         revalidate: 1,
//     }
// }
