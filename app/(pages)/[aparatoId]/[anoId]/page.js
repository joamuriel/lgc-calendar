import { Header } from '@/app/ui/header.js';
import { years, today, calculateYearDays } from "@/app/services/dates"
import Link from "next/link";
import { leapYear, getDayOfYear } from 'date-fns';

export default function AnoItemPage({ params }) {

  const { groupedDays, restOfTheYear, leapYear } = calculateYearDays(params.anoId);

  // Función para verificar si un día es el día actual
  function isCurrentDate(day) {
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }

  // Estas variables las hago para pasarlas al header
  const totalIds = years.length;
  let prevId = parseInt(params.anoId) - 1;
  let nextId = parseInt(params.anoId) + 1;
  if (prevId === 0) {
    prevId = totalIds;
  }
  if (nextId > totalIds) {
    nextId = 1;
  }
  const prevLink = `/${params.aparatoId}/${prevId}`
  const nextLink = `/${params.aparatoId}/${nextId}`

  return(
    <>
    <Header title="Año" navigation={params.anoId} prev={prevLink} next={nextLink} />
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