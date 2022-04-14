import { useRouter } from "next/router";

const Cancel = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push("/board");
  }, 2000);

  return (
    <p className="justify-center py-10 text-center">
      Pagamento annullato. Non ti è stato addebitato nulla!
    </p>
  );
};

export default Cancel;
