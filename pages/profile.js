import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

const Pricing = () => {
    const { user } = useUser();

    return (
        <p>Profilo</p>
    );
};

export const getServerSideProps = async () => {
    const {user} = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        };
    }

    return {
        props: {},
    };
}

export default Pricing;