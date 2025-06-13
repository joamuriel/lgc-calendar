import { Header } from '@/app/ui/header.js';
import { groupedYears, currentYear } from "@/app/services/dates"
import { ErrorPage } from '@/app/ui/error-page.js';
import Link from "next/link";
import { format } from 'date-fns';

export async function generateMetadata({ params }) {
  const aparatoId = parseInt(params.aparatoId);
  
  if (isNaN(aparatoId) || aparatoId < 1 || aparatoId > groupedYears.length) {
    return {
      title: 'Aparato no encontrado - Calendaria',
      description: 'El aparato solicitado no existe en Calendaria.'
    };
  }
  
  const aparato = groupedYears[aparatoId - 1];
  
  return {
    title: `Aparato ${aparatoId} (${aparato[0]}-${aparato[3]}) - Calendaria`,
    description: `Explora el Aparato ${aparatoId} del calendario LGC, que incluye los años ${aparato[0]} a ${aparato[3]}.`,
    openGraph: {
      title: `Aparato ${aparatoId} - Calendaria`,
      description: `Años ${aparato[0]} a ${aparato[3]} del sistema de calendario LGC`,
    }
  };
}


export default function AparatoItemPage({ params }) {
  // Validar parámetros
  const aparatoId = parseInt(params.aparatoId);
  
  // Validación de límites
  if (isNaN(aparatoId) || aparatoId < 1 || aparatoId > groupedYears.length) {
    return (
      <ErrorPage 
        title="Aparato no encontrado"
        message={`El aparato ${params.aparatoId} no existe.`}
        backLink="/"
        backText="Volver al inicio"
      />
    );
  }
  
  const aparato = groupedYears[aparatoId - 1];

  // Navegación con validación
  const totalIds = groupedYears.length;
  const prevId = aparatoId === 1 ? totalIds : aparatoId - 1;
  const nextId = aparatoId === totalIds ? 1 : aparatoId + 1;
  
  const prevLink = `/${prevId}`
  const nextLink = `/${nextId}`
  
  return(
    <>
    <Header title="Aparato" navigation={aparatoId} prev={prevLink} next={nextLink} />
    <section className="w-full flex flex-col mt-12">
      <div className='flex gap-6 items-center justify-center'>
        <div className="gap-0 grid grid-cols-2 w-full md:w-auto md:h-[70vh] aparato">
          <Link href={`/${aparatoId}/${aparato[0]}`} className={`cuadrante order-3 ${aparato[0] === currentYear ? 'today' : ''}`}>
            <p className="absolute bottom-1 left-1.5 text-xs">1-365</p>
            <h1 className="text-2xl md:text-5xl h-title">{aparato[0]}</h1>
            <h2 className="uppercase">Asume</h2>
          </Link>
          <Link href={`/${aparatoId}/${aparato[1]}`} className={`cuadrante order-2 ${aparato[1] === currentYear ? 'today' : ''}`}>
            <p className="absolute top-1 right-1.5 text-xs">366-730</p>
            <h1 className="text-2xl md:text-5xl h-title">{aparato[1]}</h1>
            <h2 className="uppercase">Asimila</h2>
          </Link>
          <Link href={`/${aparatoId}/${aparato[2]}`} className={`cuadrante order-1 ${aparato[2] === currentYear ? 'today' : ''}`}>
            <p className="absolute top-1 left-1.5 text-xs">731-1095</p>
            <h1 className="text-2xl md:text-5xl h-title">{aparato[2]}</h1>
            <h2 className="uppercase">Desafía</h2>
          </Link>
          <Link href={`/${aparatoId}/${aparato[3]}`} className={`cuadrante order-4 ${aparato[3] === currentYear ? 'today' : ''}`}>
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