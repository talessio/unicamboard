import { useRouter } from "next/router";

const Cancel = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push("/choose-new-id");
  }, 3000);

  return (
    <p className="justify-center py-10 text-center">
      Pagamento annullato. Non ti è stato addebitato nulla!
    </p>
  );
};

export default Cancel;
