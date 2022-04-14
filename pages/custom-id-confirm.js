import { useRouter } from "next/router";

const CustomIdConfirm = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push("/board");
  }, 2000);

  return (
    <p className="justify-center py-10 text-center">
      Il tuo nome utente è stato modificato!
    </p>
  );
};

export default CustomIdConfirm;
