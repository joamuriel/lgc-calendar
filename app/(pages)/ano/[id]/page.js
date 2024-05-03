import { Header } from '@/app/ui/header.js';
import { currentYear, years, groupedYears } from "@/app/services/dates"
import Link from "next/link";
import { startOfYear, endOfYear, eachDayOfInterval, isLeapYear } from 'date-fns';

// guardar todos los días de un año ??
// tomar los 352 primeros días del año y divirlos en grupos de 16 días.
// guardar en otra variable el resto de los días del año (13 dias si es un año de 365 y 14 días si es año bisiesto)

export default function AnoItemPage({ params: {id} }) {

  // Obtener el primer y último día del año
  const startDate = startOfYear(new Date(parseInt(id), 0, 1));
  const endDate = endOfYear(new Date(parseInt(id), 11, 31));

  // Obtener todos los días del año
  const allDaysOfYear = eachDayOfInterval({ start: startDate, end: endDate });

  // Obtener los primeros 352 días del año
  const first352Days = allDaysOfYear.slice(0, 352);

  // Dividir los primeros 352 días en grupos de 16 días
  const groupedDays = [];
  for (let i = 0; i < first352Days.length; i += 16) {
    groupedDays.push(first352Days.slice(i, i + 16));
  }

  // Obtener el resto de los días del año
  const leapYear = isLeapYear(parseInt(id));
  const restOfTheYear = leapYear ? allDaysOfYear.slice(352, 366) : allDaysOfYear.slice(352, 365);

  // Estas variables las hago para pasarlas al header
  const totalIds = years.length;
  let prevId = parseInt(id) - 1;
  let nextId = parseInt(id) + 1;
  if (prevId === 0) {
    prevId = totalIds;
  }
  if (nextId > totalIds) {
    nextId = 1;
  }

  const prevLink = `/ano/${prevId}`
  const nextLink = `/ano/${nextId}`

  return(
    <>
    <Header title="Año" navigation={id} prev={prevLink} next={nextLink} />
    <div className='gap-0 grid grid-cols-2 w-full ano mt-12 '>
      {/* Cuadrante NO */}
      <div className='cuadrante'>
        <h1 className='h-title text-3xl'>NO <small>(Humano)</small></h1>
        <table className='table table-auto w-full'>
          <thead>
            <tr>
              <th className='text-right px-3 text-sm w-12'>Vuelta</th>
              <th className='bg-foreground text-background border'>Lógica</th>
              <th className='bg-foreground text-background border'>Inhumano</th>
              <th className='bg-foreground text-background border'>Humano</th>
              <th className='bg-foreground text-background border'>Contexto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='text-right px-3 text-sm'>2</th>
              <td>
                <div className='day'>
                  <div className='flex w-full justify-between'>
                    <p className='id'>9</p>
                    <p className='negative'>-357</p>
                  </div>
                  <p className='date'>Martes 09/01</p>
                </div>
              </td>
              <td>
                <div className='day'>
                  <div className='flex w-full justify-between'>
                    <p className='id'>10</p>
                    <p className='negative'>-356</p>
                  </div>
                  <p className='date'>Miércoles 10/01</p>
                </div>
              </td>
              <td>
                <div className='day'>
                  <div className='flex w-full justify-between'>
                    <p className='id'>11</p>
                    <p className='negative'>-355</p>
                  </div>
                  <p className='date'>Jueves 11/01</p>
                </div>
              </td>
              <td>
                <div className='day'>
                  <div className='flex w-full justify-between'>
                    <p className='id'>12</p>
                    <p className='negative'>-354</p>
                  </div>
                  <p className='date'>Viernes 12/01</p>
                </div>
              </td>
            </tr>
            <tr>
              <th className='text-right px-3 text-sm'>1</th>
              <td>
                <div className='day'>
                  <div className='flex w-full justify-between'>
                    <p className='id'>9</p>
                    <p className='negative'>-357</p>
                  </div>
                  <p className='date'>Martes 09/01</p>
                </div>
              </td>
              <td>
                <div className='day'>
                  <div className='flex w-full justify-between'>
                    <p className='id'>10</p>
                    <p className='negative'>-356</p>
                  </div>
                  <p className='date'>Miércoles 10/01</p>
                </div>
              </td>
              <td>
                <div className='day'>
                  <div className='flex w-full justify-between'>
                    <p className='id'>11</p>
                    <p className='negative'>-355</p>
                  </div>
                  <p className='date'>Jueves 11/01</p>
                </div>
              </td>
              <td>
                <div className='day'>
                  <div className='flex w-full justify-between'>
                    <p className='id'>12</p>
                    <p className='negative'>-354</p>
                  </div>
                  <p className='date'>Viernes 12/01</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Cuadrante NE */}
      <div className='cuadrante'>
      <h1 className='h-title text-3xl'>NE <small>(Inhumano)</small></h1>
      </div>
      {/* Cuadrante SO */}
      <div className='cuadrante'>
        <h1 className='h-title text-3xl'>SO <small>(Lógica)</small></h1>
      </div>
      {/* Cuadrante SE */}
      <div className='cuadrante'>
        <h1 className='h-title text-3xl'>SE <small>(Contexto)</small></h1>
      </div>
    </div>
    </>
  )

}