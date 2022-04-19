import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useUser } from "../context/user";

export function withPublic(Component) {
  return function withPublic(props) {
    const { user } = useUser();
    const router = useRouter();

    if (user) {
      router.replace("/board");
      return (
        <p className="justify-center py-10 text-center">
          Sto facendo l'accesso
        </p>
      );
    }
    return <Component user={user} {...props} />;
  };
}

export function withProtected(Component) {
  return function withProtected(props) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/login");
      }
    }, []);
    return <Component user={user} {...props} />;
  };
}
