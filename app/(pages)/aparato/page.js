import { Header } from '@/app/ui/header.js';
import { currentYear, groupedYears } from "@/app/services/dates";
import Link from "next/link";

const currentGroup = groupedYears.findIndex(arr => arr.includes(currentYear));

export default function AparatoPage() {
  return(
    <>
      <Header title="Aparatos" />
      <div className="mb-12 flex gap-12 mt-12">
        <h2 className='title text-lg'>
          Año actual:<br/>
          <span className='text-3xl h-title'>{currentYear}</span>
        </h2>
        
        <h2 className='title text-lg'>
          <Link href={`/aparato/${currentGroup + 1}`}>
            Aparato actual:<br/>
            <span className='text-3xl h-title underline'>{currentGroup !== -1 ? currentGroup + 1 : 'No disponible'}</span>
          </Link>
        </h2>
      </div>
      <div className="flex flex-wrap">
        {groupedYears.map(([key], indice) => (
          <Link className="border aspect-square flex justify-center items-center text-xs p-1 w-12 -ml-[1px] -mb-[1px] h-title transition-colors duration-75 hover:bg-foreground hover:text-background" key={key} href={`/aparato/${indice + 1}`}>{indice + 1}</Link>
        ))}
      </div>
    </>
  )
}