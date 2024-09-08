import { Header } from '@/app/ui/header.js';
import { startOfYear, endOfYear, eachDayOfInterval, isLeapYear } from 'date-fns';
import { today, calculateYearDays, calculateSolarDay } from "@/app/services/dates"
import Link from "next/link";

export default function VueltaItemPage({ params }) {

  const { groupedDays } = calculateYearDays(params.anoId);

  function isCurrentDate(day) {
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }
  

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

  return (
    <>
      <Header title="Vuelta" navigation={params.vueltaId} prev={prevLink} next={nextLink} />
      <h1 className='h-title text-2xl md:text-4xl'>Año <Link href={`/${params.aparatoId}/${params.anoId}`} className="underline">{params.anoId}</Link></h1>
      <div className='gap-0 md:grid grid-cols-2 w-full mt-12 vuelta' id={params.vueltaId}>
        
        <div className='cuadrante order-3'>
          <h3 className='absolute top-0.5 md:top-auto md:bottom-0.5 left-1 text-xs'>SO (Lógica)</h3>
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

        <div className='cuadrante order-2'>
          <h3 className='absolute top-0.5 left-1 md:left-auto md:right-1 text-xs'>NE (Inhumano)</h3>
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

        <div className='cuadrante order-1'>
          <h3 className='absolute top-0.5 left-1 text-xs'>NO (Humano)</h3>
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

        <div className='cuadrante order-4'>
          <h3 className='absolute top-0.5 md:top-auto md:bottom-0.5 left-1 md:left-auto md:right-1 text-xs'>SE (Contexto)</h3>
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