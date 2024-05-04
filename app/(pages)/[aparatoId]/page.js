import { Header } from '@/app/ui/header.js';
import { groupedYears } from "@/app/services/dates"
import Link from "next/link";
import { format } from 'date-fns';


export default function AparatoItemPage({ params }) {
  const aparato = groupedYears[params.aparatoId - 1]

  // Obtener el año actual
  const currentYear = format(new Date(), 'yyyy');

  // Estas variables las hago para pasarlas al header
  const totalIds = groupedYears.length;
  let prevId = parseInt(params.aparatoId) - 1;
  let nextId = parseInt(params.aparatoId) + 1;
  if (prevId === 0) {
    prevId = totalIds;
  }
  if (nextId > totalIds) {
    nextId = 1;
  }
  
  const prevLink = `/${prevId}`
  const nextLink = `/${nextId}`
  
  return(
    <>
    <Header title="Aparato" navigation={params.aparatoId} prev={prevLink} next={nextLink} />
    <section className="w-full flex flex-col mt-12">
      <div className='flex gap-6 items-center justify-center'>
        <div className="gap-0 grid grid-cols-2 w-full md:w-auto md:h-[70vh] aparato">
          <Link href={`/${params.aparatoId}/${aparato[0]}`} className={`cuadrante order-3 ${aparato[0] === currentYear ? 'today' : ''}`}>
            <p className="absolute bottom-1 left-1.5 text-xs">1-365</p>
            <h1 className="text-2xl md:text-5xl h-title">{aparato[0]}</h1>
            <h2 className="uppercase">Asume</h2>
          </Link>
          <Link href={`/${params.aparatoId}/${aparato[1]}`} className={`cuadrante order-2 ${aparato[1] === currentYear ? 'today' : ''}`}>
            <p className="absolute top-1 right-1.5 text-xs">366-730</p>
            <h1 className="text-2xl md:text-5xl h-title">{aparato[1]}</h1>
            <h2 className="uppercase">Asimila</h2>
          </Link>
          <Link href={`/${params.aparatoId}/${aparato[2]}`} className={`cuadrante order-1 ${aparato[2] === currentYear ? 'today' : ''}`}>
            <p className="absolute top-1 left-1.5 text-xs">731-1095</p>
            <h1 className="text-2xl md:text-5xl h-title">{aparato[2]}</h1>
            <h2 className="uppercase">Desafía</h2>
          </Link>
          <Link href={`/${params.aparatoId}/${aparato[3]}`} className={`cuadrante order-4 ${aparato[3] === currentYear ? 'today' : ''}`}>
            <p className="absolute bottom-1 right-1.5 text-xs">1096-1461</p>
            <h1 className="text-2xl md:text-5xl h-title">{aparato[3]}</h1>
            <h2 className="uppercase">Decide</h2>
          </Link>
        </div>
      </div>
    </section>
    </>
  )

}