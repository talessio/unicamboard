import Link from "next/link"
import { useUser } from "../context/user";

export default function Nav() {
  const { user, isLoading } = useUser();

  return (
    <nav className="py-4 border-b border-slate-300 text-sm font-medium">
      <ul className="flex space-x-5 justify-center">
        <div className="ml-2">
          <Link href={user ? "/board" : "/"}>
            <a>Home</a>
          </Link>
        </div>
        {!!user && (
          <div className="ml-2">
            <Link href="/pricing">
              <a>Pagamenti</a>
            </Link>
          </div>
        )}
        {!!user && (
          <div className="ml-2">
            <Link href="/profile">
              <a>Profilo</a>
            </Link>
          </div>
        )}
        <div>
          <Link href={user ? '/logout' : '/login'}>
            <a>{user ? "Esci" : "Accedi"}</a>
          </Link>
        </div>
      </ul>
    </nav>
  )
}