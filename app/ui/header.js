import Link from "next/link";
import { IconArrowLeft } from "../icons/arrow-left";
import { IconArrowRight } from "../icons/arrow-right";

export function Header( props ) {
  return (
    <header className="header flex items-center gap-3">
      <h1 className="h-title text-4xl md:text-7xl pt-12 md:pt-0">{props.title}</h1>
      {props.navigation && (
        <div className="navigation flex items-center">
          <Link href={props.prev} className="text-sm h-title underline w-8 flex justify-center">
            <IconArrowLeft />
          </Link>
          <h2 className="h-title text-4xl md:text-7xl pt-12 md:pt-0">{props.navigation}</h2>
          <Link href={props.next} className="text-sm h-title underline w-8 flex justify-center ml-1">
            <IconArrowRight />
          </Link>
        </div>
      )}
    </header>
  )
}