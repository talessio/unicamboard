import { useEffect } from "react";
import { useUser } from "../context/user";
import { withPublic } from "../hooks/route";

const Login = () => {
  const { login } = useUser();

  useEffect(login, []);

  return (
    <p className="justify-center py-10 text-center">Sto facendo l'accesso</p>
  );
};

export default withPublic(Login);
// export default Login;
