// import { useRouter } from "next/router";

// const Protected = (WrappedComponent) => {
//   return (props) => {
//     if (typeof window !== "undefined") {
//       const Router = useRouter();
//       const accessToken = localStorage.getItem("accessToken");

//       if (!accessToken) {
//         Router.replace("/login");
//         return null;
//       }

//       return <WrappedComponent {...props} />;
//     }

//     return null;
//   };
// };

// export default Protected;


// ------------------------------

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../context/user";

export default function Protected({ children }) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (user) {
    return { children };
  }

  return null;
}
