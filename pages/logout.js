import { useEffect } from "react";
import { useUser } from "../context/user";

const Logout = () => {
    const { logout } = useUser();

    useEffect(logout, []);

    return <p className="justify-center py-10 text-center">Sto uscendo</p>;
};

export default Logout;