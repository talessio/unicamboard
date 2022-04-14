import { useRouter } from "next/router";

const adminMessageConfirm = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push("/board");
  }, 2000);

  return (
    <p className="justify-center py-10 text-center">
      Il tuo messaggio è stato inviato correttamente!
    </p>
  );
};

export default adminMessageConfirm;
