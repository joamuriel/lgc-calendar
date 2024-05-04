import { Header } from '@/app/ui/header.js';
import { startOfYear, endOfYear, eachDayOfInterval, isLeapYear } from 'date-fns';
import { startFirstDate } from "@/app/services/dates"
import Link from "next/link";

export default function VueltaItemPage({ params }) {

  const startDate = startOfYear(new Date(parseInt(params.anoId), 0, 1));
  const endDate = endOfYear(new Date(parseInt(params.anoId), 11, 31));
  const allDaysOfYear = eachDayOfInterval({ start: startDate, end: endDate });
  const first352Days = allDaysOfYear.slice(0, 352);
  const groupedDays = [];
  for (let i = 0; i < first352Days.length; i += 16) {
    groupedDays.push(first352Days.slice(i, i + 16));
  }
  const leapYear = isLeapYear(startDate);
  const restOfTheYear = leapYear ? allDaysOfYear.slice(352, 366) : allDaysOfYear.slice(352, 365);

  // Estas variables las hago para pasarlas al header
  const totalIds = groupedDays.length;
  let prevId = parseInt(params.vueltaId) - 1;
  let nextId = parseInt(params.vueltaId) + 1;
  if (prevId === 0) {
    prevId = totalIds;
  }
  if (nextId > totalIds) {
    nextId = 1;
  }
  const prevLink = `/${params.aparatoId}/${params.anoId}/${prevId}`
  const nextLink = `/${params.aparatoId}/${params.anoId}/${nextId}`

  const currentDate = new Date();
  // Función para verificar si un día es el día actual
  function isCurrentDate(day) {
    return (
      day.getDate() === currentDate.getDate() &&
      day.getMonth() === currentDate.getMonth() &&
      day.getFullYear() === currentDate.getFullYear()
    );
  }

  function calculateSolarDay(day) {
    // Fecha del primer día del primer año de todos los tiempos
    const startFirstDate = new Date(1, 0, 1); // Año 1, mes 0 (enero), día 1
  
    // Calcula la diferencia en milisegundos
    const differenceInMillisecs = day.getTime() - startFirstDate.getTime();
  
    // Convierte la diferencia en días
    const daysDifference = Math.floor(differenceInMillisecs / (1000 * 60 * 60 * 24));
  
    // Añade 1 porque queremos contar desde el día 1
    return daysDifference + 1;
  }

  return (
    <>
      <Header title="Vuelta" navigation={params.vueltaId} prev={prevLink} next={nextLink} />
      <h1 className='h-title text-2xl md:text-4xl'>Año <Link href={`/${params.aparatoId}/${params.anoId}`} className="underline">{params.anoId}</Link></h1>
      <div className='gap-0 md:grid grid-cols-2 w-full mt-12 vuelta' id={params.vueltaId}>
        <div className='cuadrante'>
          <div className='day-group'>
            {groupedDays[params.vueltaId - 1].slice(8, 12).map((day, dayIndex) => (
              <div key={dayIndex} className={`day ${isCurrentDate(day) ? 'today' : ''}`}>
                <p className='weekday'>{day.toLocaleDateString('es-ES', { weekday: 'long'})}</p>
                <p className='id'>Día {dayIndex + 1 + 8}</p>
                <p className='date'>{day.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}</p>
                <p className='solar-day'>Día solar: {calculateSolarDay(day)}</p>
              </div>  
            ))}
          </div>
        </div>
        <div className='cuadrante'>
          <div className='day-group'>
            {groupedDays[params.vueltaId - 1].slice(4, 8).map((day, dayIndex) => (
              <div key={dayIndex} className={`day ${isCurrentDate(day) ? 'today' : ''}`}>
                <p className='weekday'>{day.toLocaleDateString('es-ES', { weekday: 'long'})}</p>
                <p className='id'>Día {dayIndex + 1 + 4}</p>
                <p className='date'>{day.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}</p>
                <p className='solar-day'>Día solar: {calculateSolarDay(day)}</p>
              </div>  
            ))}
          </div>
        </div>
        <div className='cuadrante'>
          <div className='day-group'>
            {groupedDays[params.vueltaId - 1].slice(0, 4).map((day, dayIndex) => (
              <div key={dayIndex} className={`day ${isCurrentDate(day) ? 'today' : ''}`}>
              <p className='weekday'>{day.toLocaleDateString('es-ES', { weekday: 'long'})}</p>
              <p className='id'>Día {dayIndex + 1}</p>
              <p className='date'>{day.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}</p>
              <p className='solar-day'>Día solar: {calculateSolarDay(day)}</p>
            </div>  
            ))}
          </div>
        </div>
        <div className='cuadrante'>
          <div className='day-group'>
            {groupedDays[params.vueltaId - 1].slice(12, 16).map((day, dayIndex) => (
              <div key={dayIndex} className={`day ${isCurrentDate(day) ? 'today' : ''}`}>
              <p className='weekday'>{day.toLocaleDateString('es-ES', { weekday: 'long'})}</p>
              <p className='id'>Día {dayIndex + 1 + 12}</p>
              <p className='date'>{day.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}</p>
              <p className='solar-day'>Día solar: {calculateSolarDay(day)}</p>
            </div>  
            ))}
          </div>
        </div>
      </div>
    </>
  );
}