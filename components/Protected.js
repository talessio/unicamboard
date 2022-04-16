import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../context/user";

const Protected = ({ children }) => {
  const user = useUser();
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return children;
};

export default Protected;
