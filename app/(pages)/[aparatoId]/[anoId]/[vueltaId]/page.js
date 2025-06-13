import { Header } from '@/app/ui/header.js';
import { startOfYear, endOfYear, eachDayOfInterval, isLeapYear } from 'date-fns';
import { today, calculateYearDays, calculateSolarDay } from "@/app/services/dates"
import Link from "next/link";

export async function generateMetadata({ params }) {
  const vueltaId = parseInt(params.vueltaId);
  const anoId = parseInt(params.anoId);
  const aparatoId = parseInt(params.aparatoId);
  
  if (isNaN(anoId) || anoId < 1 || anoId > 3000) {
    return {
      title: 'Año no válido - Calendaria',
      description: 'El año solicitado no es válido.'
    };
  }
  
  const { groupedDays } = calculateYearDays(anoId);
  
  if (isNaN(vueltaId) || vueltaId < 1 || vueltaId > groupedDays.length) {
    return {
      title: 'Vuelta no encontrada - Calendaria',
      description: 'La vuelta solicitada no existe.'
    };
  }
  
  return {
    title: `Vuelta ${vueltaId} del Año ${anoId} - Calendaria`,
    description: `Explora la Vuelta ${vueltaId} del año ${anoId}, con sus 16 días organizados en 4 cuadrantes temáticos.`,
    openGraph: {
      title: `Vuelta ${vueltaId} - Año ${anoId} - Calendaria`,
      description: `Vuelta ${vueltaId} del calendario LGC con sus 16 días organizados por cuadrantes`,
    }
  };
}

export default function VueltaItemPage({ params }) {
  // Validar parámetros
  const vueltaId = parseInt(params.vueltaId);
  const anoId = parseInt(params.anoId);
  const aparatoId = parseInt(params.aparatoId);
  
  // Validación de año
  if (isNaN(anoId) || anoId < 1 || anoId > 3000) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Año no válido</h1>
        <p className="mb-4">El año {params.anoId} no es válido (rango: 1-3000).</p>
        <Link href={`/${aparatoId}`} className="underline">Volver al aparato</Link>
      </div>
    );
  }

  const { groupedDays } = calculateYearDays(anoId);
  
  // Validación de vuelta
  if (isNaN(vueltaId) || vueltaId < 1 || vueltaId > groupedDays.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Vuelta no encontrada</h1>
        <p className="mb-4">La vuelta {params.vueltaId} no existe en el año {anoId}.</p>
        <Link href={`/${aparatoId}/${anoId}`} className="underline">Volver al año</Link>
      </div>
    );
  }

  function isCurrentDate(day) {
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }

  // Navegación con validación
  const totalIds = groupedDays.length;
  const prevId = vueltaId === 1 ? totalIds : vueltaId - 1;
  const nextId = vueltaId === totalIds ? 1 : vueltaId + 1;
  const prevLink = `/${params.aparatoId}/${params.anoId}/${prevId}`
  const nextLink = `/${params.aparatoId}/${params.anoId}/${nextId}`

  return (
    <>
      <Header title="Vuelta" navigation={vueltaId} prev={prevLink} next={nextLink} />
      <h1 className='h-title text-2xl md:text-4xl'>Año <Link href={`/${aparatoId}/${anoId}`} className="underline">{anoId}</Link></h1>
      <div className='gap-0 md:grid grid-cols-2 w-full mt-12 vuelta' id={params.vueltaId}>
        
        <div className='cuadrante order-3'>
          <h3 className='absolute top-0.5 md:top-auto md:bottom-0.5 left-1 text-xs'>SO (Lógica)</h3>
          <div className='day-group'>
            {groupedDays[vueltaId - 1].slice(0, 4).map((day, dayIndex) => (
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
            {groupedDays[vueltaId - 1].slice(4, 8).map((day, dayIndex) => (
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
            {groupedDays[vueltaId - 1].slice(8, 12).map((day, dayIndex) => (
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
            {groupedDays[vueltaId - 1].slice(12, 16).map((day, dayIndex) => (
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