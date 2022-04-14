import { useRouter } from "next/router";

function invalidEmail() {
  const router = useRouter();

  setTimeout(() => {
    router.push("/");
  }, 3000);

  return (
    <p className="justify-center py-10 text-center">
      Email non valida!<br/> Puoi accedere solo con la tua email UniCam.
    </p>
  );
}

export default invalidEmail;
