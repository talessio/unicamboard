import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push("/choose-new-id");
  }, 2000);

  return (
    <p className="justify-center py-10 text-center">
      Pagamento andato a buon fine
    </p>
  );
};

export default Success;
