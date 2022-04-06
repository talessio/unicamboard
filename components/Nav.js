import Link from "next/link"
import { useUser } from "../context/user";

export default function Nav() {
  const { user } = useUser();

  return (
    <nav className="py-4 px-6 border-b border-slate-300 text-sm font-medium">
      <ul className="flex space-x-3">
        <Link href={user ? '/board' : '/'}>
          <a>Home</a>
        </Link>
        <Link href="/pricing">
          <a>{user ? "Pagamenti" : ""}</a>
        </Link>
        <Link href={'/contact-admin'}>
          <a className="">{"Contattaci"}</a>
        </Link>
        <Link href={user ? '/logout' : '/login'}>
          <a className="">{user ? "Esci" : "Accedi"}</a>
        </Link>
      </ul>
    </nav>
  )
}