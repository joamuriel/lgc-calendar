import { Header } from '@/app/ui/header.js';
import { years, today, calculateYearDays } from "@/app/services/dates"
import Link from "next/link";
import { getDayOfYear } from 'date-fns';

export async function generateMetadata({ params }) {
  const anoId = parseInt(params.anoId);
  const aparatoId = parseInt(params.aparatoId);
  
  if (isNaN(anoId) || anoId < 1 || anoId > 3000) {
    return {
      title: 'Año no encontrado - Calendaria',
      description: 'El año solicitado no es válido.'
    };
  }
  
  return {
    title: `Año ${anoId} - Calendaria`,
    description: `Explora el año ${anoId} del calendario LGC, organizado en 22 vueltas y cuadrantes temáticos.`,
    openGraph: {
      title: `Año ${anoId} - Calendaria`,
      description: `Calendario LGC para el año ${anoId} con sus 22 vueltas y organización por cuadrantes`,
    }
  };
}

export default function AnoItemPage({ params }) {
  // Validar parámetros
  const anoId = parseInt(params.anoId);
  const aparatoId = parseInt(params.aparatoId);
  
  // Validación de límites
  if (isNaN(anoId) || anoId < 1 || anoId > 3000) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Año no encontrado</h1>
        <p className="mb-4">El año {params.anoId} no es válido (rango: 1-3000).</p>
        <Link href={`/${aparatoId}`} className="underline">Volver al aparato</Link>
      </div>
    );
  }

  const { groupedDays, restOfTheYear, leapYear } = calculateYearDays(anoId);

  // Función para verificar si un día es el día actual
  function isCurrentDate(day) {
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }

  // Navegación con validación
  const totalIds = years.length;
  const prevId = anoId === 1 ? 3000 : anoId - 1;
  const nextId = anoId === 3000 ? 1 : anoId + 1;
  const prevLink = `/${params.aparatoId}/${prevId}`
  const nextLink = `/${params.aparatoId}/${nextId}`

  return(
    <>
    <Header title="Año" navigation={anoId} prev={prevLink} next={nextLink} />
    <div className='gap-0 md:grid grid-cols-2 w-full ano mt-12'>
      {/* Cuadrante NO */}
      <div className='cuadrante'>
        <h1 className='h-title text-2xl md:text-3xl'>NO <small>(Humano)</small></h1>
        <table className='table table-auto w-full mt-3'>
          <thead>
            <tr>
              <th className='th-vuelta'>Vuelta</th>
              <th className='th'>Lógica</th>
              <th className='th'>Inhumano</th>
              <th className='th'>Humano</th>
              <th className='th'>Contexto</th>
            </tr>
          </thead>
          <tbody>
            {/* vueltas */}
            {groupedDays.slice().reverse().map((group, groupIndex) => (
              <tr key={groupIndex}>
                <th className='th-vuelta'>{23 - groupIndex - 1}</th>
                {group.slice(8, 12).map((day, dayIndex) => (
                  <td key={dayIndex} className={`vuelta-${23 - groupIndex - 1} ${isCurrentDate(day) ? 'today' : ''}`}>
                    <Link href={`/${params.aparatoId}/${params.anoId}/${23 - groupIndex - 1}`}>
                      <div className='day'>
                        <div className='day-numbers'>
                          <p className='id'>{getDayOfYear(day)}</p>
                          <p className='negative'>-{(leapYear ? 366 : 365) - (getDayOfYear(day))}</p>
                        </div>
                        <p className='date'>{day.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit' })}</p>
                      </div>
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      {/* Cuadrante NE */}
      <div className='cuadrante'>
      <h1 className='h-title text-2xl md:text-3xl'>NE <small>(Inhumano)</small></h1>
      <table className='table table-auto w-full mt-3'>
          <thead>
            <tr>
              <th className='th'>Lógica</th>
              <th className='th'>Inhumano</th>
              <th className='th'>Humano</th>
              <th className='th'>Contexto</th>
              <th className='th-vuelta'>Vuelta</th>
            </tr>
          </thead>
          <tbody>
            {/* vueltas */}
            {groupedDays.slice().reverse().map((group, groupIndex) => (
              <tr key={groupIndex}>
                {group.slice(4, 8).map((day, dayIndex) => (
                  <td key={dayIndex} className={`vuelta-${23 - groupIndex - 1} ${isCurrentDate(day) ? 'today' : ''}`}>
                    <Link href={`/${params.aparatoId}/${params.anoId}/${23 - groupIndex - 1}`}>
                      <div className='day'>
                      <div className='day-numbers'>
                          <p className='id'>{getDayOfYear(day)}</p>
                          <p className='negative'>-{(leapYear ? 366 : 365) - (getDayOfYear(day))}</p>
                        </div>
                        <p className='date'>{day.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit' })}</p>
                      </div>
                      </Link>
                  </td>
                ))}
                <th className='th-vuelta'>{23 - groupIndex - 1}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Cuadrante SO */}
      <div className='cuadrante'>
      <h1 className='h-title text-2xl md:text-3xl mb-3 md:hidden block'>SO <small>(Lógica)</small></h1>
        <table className='table table-auto w-full'>
          <thead className='md:hidden table-header-group'>
            <tr>
              <th className='th-vuelta'></th>
              <th className='th'>Lógica</th>
              <th className='th'>Inhumano</th>
              <th className='th'>Humano</th>
              <th className='th'>Contexto</th>
            </tr>
          </thead>
          <tbody>
            {/* vueltas */}
            {groupedDays.map((group, groupIndex) => (
              <tr key={groupIndex}>
                <th className='th-vuelta'>{groupIndex + 1}</th>
                {group.slice(0, 4).map((day, dayIndex) => (
                  <td key={dayIndex} className={`vuelta-${groupIndex + 1} ${isCurrentDate(day) ? 'today' : ''}`}>
                    <Link href={`/${params.aparatoId}/${params.anoId}/${groupIndex + 1}`}>
                      <div className='day'>
                      <div className='day-numbers'>
                          <p className='id'>{getDayOfYear(day)}</p>
                          <p className='negative'>-{(leapYear ? 366 : 365) - (getDayOfYear(day))}</p>
                        </div>
                        <p className='date'>{day.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit' })}</p>
                      </div>
                      </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot className='hidden md:table-footer-group'>
            <tr>
              <th className='th-vuelta'></th>
              <th className='th'>Lógica</th>
              <th className='th'>Inhumano</th>
              <th className='th'>Humano</th>
              <th className='th'>Contexto</th>
            </tr>
          </tfoot>
        </table>
        <h1 className='h-title text-2xl md:text-3xl mt-3 hidden md:block'>SO <small>(Lógica)</small></h1>
      </div>
      {/* Cuadrante SE */}
      <div className='cuadrante'>
      <h1 className='h-title text-2xl md:text-3xl mb-3 block md:hidden'>SE <small>(Contexto)</small></h1>
        <table className='table table-auto w-full'>
          <thead className='md:hidden table-header-group'>
            <tr>
              <th className='th'>Lógica</th>
              <th className='th'>Inhumano</th>
              <th className='th'>Humano</th>
              <th className='th'>Contexto</th>
              <th className='th-vuelta'></th>
            </tr>
          </thead>
          <tbody>
            {/* vueltas */}
            {groupedDays.map((group, groupIndex) => (
              <tr key={groupIndex}>
                {group.slice(12, 16).map((day, dayIndex) => (
                  <td key={dayIndex} className={`vuelta-${groupIndex + 1} ${isCurrentDate(day) ? 'today' : ''}`}>
                    <Link href={`/${params.aparatoId}/${params.anoId}/${groupIndex + 1}`}>
                      <div className='day'>
                      <div className='day-numbers'>
                          <p className='id'>{getDayOfYear(day)}</p>
                          <p className='negative'>-{(leapYear ? 366 : 365) - (getDayOfYear(day))}</p>
                        </div>
                        <p className='date'>{day.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit' })}</p>
                      </div>
                    </Link>
                  </td>
                ))}
                <th className='th-vuelta'>{groupIndex + 1}</th>
              </tr>
            ))}
          </tbody>
          <tfoot className='hidden md:table-footer-group'>
            <tr>
              <th className='th'>Lógica</th>
              <th className='th'>Inhumano</th>
              <th className='th'>Humano</th>
              <th className='th'>Contexto</th>
              <th className='th-vuelta'></th>
            </tr>
          </tfoot>
        </table>
        <h1 className='h-title text-2xl md:text-3xl mt-3 hidden md:block'>SE <small>(Contexto)</small></h1>
      </div>
    </div>
    {/* Anillo de fuego */}
    <div className='firering mt-12'>
      {restOfTheYear.map((day, index) => (
        <div key={index} className='firering-day'>
          <div className='day'>
            <div className='day-numbers'>
              <p className='id'>{getDayOfYear(day)}</p>
              <p className='negative'>-{(leapYear ? 366 : 365) - (getDayOfYear(day))}</p>
            </div>
            <p className='date'>{day.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit' })}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  )

}