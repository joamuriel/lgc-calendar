import Link from "next/link";
import { ThemeSwitcher } from "./switch";

export function Footer() {
  return (
    <>
      <footer className="flex flex-col md:flex-row pt-12 justify-between">
        <div>
          <ThemeSwitcher />
        </div>
        <h6 className="text-xxs">Desarrollado por <Link className="underline" target="_blank" href='https://joamuriel.com/'>Joa</Link></h6>
      </footer>
    </>
  )
}