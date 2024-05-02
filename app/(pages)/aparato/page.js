import { currentYear, years, groupedYears } from "@/app/services/dates"
import Link from "next/link";

const currentGroup = groupedYears.findIndex(arr => arr.includes(currentYear));

export default function AparatoPage() {
  return(
    <section className="flex flex-col items-center justify-center">
      <h1 className="h1 mb-6">APARATOS</h1>
      <div className="mb-6 flex gap-12">
        <h2>Año actual: {currentYear}</h2>
        <h2><Link href={`/aparato/${currentGroup + 1}`}>Aparato actual: {currentGroup !== -1 ? currentGroup + 1 : 'No disponible'}</Link></h2>
      </div>
      <div className="flex flex-wrap">
      {groupedYears.map(([key], indice) => (
        <Link className="border aspect-square flex justify-center items-center text-xs p-1 w-12 -ml-[1px] -mb-[1px]" key={key} href={`/aparato/${indice + 1}`}>{indice + 1}</Link>
      ))}
      </div>
    </section>
  )
}