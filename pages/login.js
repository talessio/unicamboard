import { useEffect } from "react";
import { useUser } from "../context/user";

const Login = () => {
    const { login, isLoading } = useUser();

    useEffect(login, []);

    return <p className="justify-center py-10 text-center">Sto facendo l'accesso</p>
};

export default Login;