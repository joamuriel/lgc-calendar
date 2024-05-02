import { currentYear, years, groupedYears } from "@/app/services/dates"
import Link from "next/link";

export default function AparatoItemPage({ params: {id} }) {
  const adjId = id - 1; // Restar uno al id porq el indice 0 del array quiero que sea 1
  const aparato = groupedYears[adjId]
  
  const prevId = adjId > 0 ? adjId : groupedYears.length; // Si el id es 0, ir a la última página
  const nextId = adjId < groupedYears.length - 1 ? adjId + 2 : 1; // Si el id es el último, ir a la primera página

  return(
    <section className="w-full flex flex-col items-center justify-center">
      <header className="flex justify-center items-center gap-6 md:gap-12 mb-12">
        <Link href={`/aparato/${prevId}`} className="text-xs">
          prev
        </Link>
        <h1 className="h1">APARATO {id}</h1>
        <Link href={`/aparato/${nextId}`} className="text-xs">
          next
        </Link>
      </header>
      
      <div className="gap-0 grid grid-cols-2 w-full md:w-auto md:h-[60vh] aparato">
        <div className="cuadrante order-3">
          <p className="absolute bottom-1 left-1.5 text-xs">1-365</p>
          <h1 className="text-4xl">{aparato[0]}</h1>
          <h2 className="uppercase">Asume</h2>
        </div>
        <div className="cuadrante order-2">
          <p className="absolute top-1 right-1.5 text-xs">366-730</p>
          <h1 className="text-4xl">{aparato[1]}</h1>
          <h2 className="uppercase">Asimila</h2>
        </div>
        <div className="cuadrante order-1">
          <p className="absolute top-1 left-1.5 text-xs">731-1095</p>
          <h1 className="text-4xl">{aparato[2]}</h1>
          <h2 className="uppercase">Desafía</h2>
        </div>
        <div className="cuadrante order-4">
          <p className="absolute bottom-1 right-1.5 text-xs">1096-1461</p>
          <h1 className="text-4xl">{aparato[3]}</h1>
          <h2 className="uppercase">Decide</h2>
        </div>
      </div>
    </section>
  )

}