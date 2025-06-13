import Link from "next/link";
import { IconArrowLeft } from "../icons/arrow-left";
import { IconArrowRight } from "../icons/arrow-right";

export function Header( props ) {
  return (
    <header className="header flex items-center gap-3 pt-12 md:pt-0">
      <h1 className="h-title text-5xl md:text-7xl">{props.title}</h1>
      {props.navigation && (
        <div className="navigation flex items-center gap-1 md:gap-0">
          <Link 
            href={props.prev} 
            className="text-sm h-title underline w-4 md:w-8 flex justify-center hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded"
            aria-label="Anterior"
          >
            <IconArrowLeft />
          </Link>
          <h2 className="h-title text-4xl md:text-7xl px-2">{props.navigation}</h2>
          <Link 
            href={props.next} 
            className="text-sm h-title underline w-4 md:w-8 flex justify-center ml-1 hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded"
            aria-label="Siguiente"
          >
            <IconArrowRight />
          </Link>
        </div>
      )}
    </header>
  )
}