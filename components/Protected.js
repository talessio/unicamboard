// Error: board is empty
// import { useRouter } from "next/router";
// // import { useUser } from "../context/user";

// const Protected = (WrappedComponent) => {
//   return (props) => {
//     if (typeof window !== "undefined") {
//       const router = useRouter();
//       const { user } = useUser();
//       // const accessToken = localStorage.getItem("accessToken");

//       // if (!accessToken) {
//       if (!user) {
//         router.push("/login");
//         return null;
//       }

//       return <WrappedComponent {...props} />;
//     }
//   };
// };

// export default Protected;
// ------------------------------
// does nothing
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../context/user";

export default function Protected({ children }) {
  const user = useUser();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return <div>Devi fare l'accesso prima!</div>
    }
  }, []);

  if (user) return <div>{children}</div>;
}
// -------------------
//doesn't recognise login

// import { supabase } from "../utils/supabase";

// const Protected = () => {
//   return (
//     <p className="justify-center py-10 text-center">Devi accedere, prima.</p>
//   );
// };

// export const getServerSideProps = async ({ req }) => {
//   const { user } = await supabase.auth.api.getUserByCookie(req);

//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//       props: {},
//     };
//   }

//   return {
//     props: {},
//   };
// };

// export default Protected;
