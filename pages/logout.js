import { useEffect } from "react";
import { useUser } from "../context/user";
import { withProtected } from "../hooks/route";

const Logout = () => {
  const { logout } = useUser();

  useEffect(logout, []);

  return <p className="justify-center py-10 text-center">Sto uscendo</p>;
};

export default withProtected(Logout);
// export default Logout;
