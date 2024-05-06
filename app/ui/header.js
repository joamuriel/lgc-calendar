import Link from "next/link";
import { IconArrowLeft } from "../icons/arrow-left";
import { IconArrowRight } from "../icons/arrow-right";

export function Header( props ) {
  return (
    <header className="header flex items-center gap-3 pt-12 md:pt-0">
      <h1 className="h-title text-5xl md:text-7xl">{props.title}</h1>
      {props.navigation && (
        <div className="navigation flex items-center gap-1 md:gap-0">
          <Link href={props.prev} className="text-sm h-title underline w-4 md:w-8 flex justify-center">
            <IconArrowLeft />
          </Link>
          <h2 className="h-title text-4xl md:text-7xl">{props.navigation}</h2>
          <Link href={props.next} className="text-sm h-title underline w-4 md:w-8 flex justify-center ml-1">
            <IconArrowRight />
          </Link>
        </div>
      )}
    </header>
  )
}