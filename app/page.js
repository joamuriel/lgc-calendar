import { Header } from '@/app/ui/header.js';
import { currentYear, currentDate, currentYearState, currentAparato, currentVuelta, currentDay, currentDayNegative } from "@/app/services/dates"
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header title="Calendaria" />
      <section className='section-full-height py-3 relative'>
        <div className='text-sm'>
          <p>{currentDate}</p>
          <p>Aparato {currentAparato}</p>
          <p>Año {currentYearState} {currentYear}</p>
          <p>Vuelta {currentVuelta}</p>
          <p>Día {currentDay} ({currentDayNegative})</p>
        </div>
        <div className='absolute left-0 top-0 h-full w-full justify-center items-center flex'>
          <div className='grid grid-cols-3 gap-24 w-1/2 mx-auto'>
            <Link href={`/${currentAparato}`} className='card'>
              <div className='icon-aparato'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <h2 className='h-title'>Aparato</h2>
            </Link>
            <Link href={`/${currentAparato}/${currentYear}`} className='card'>
              <div className='icon-ano'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className='col-span-2'></div>
              </div>
              <h2 className='h-title'>Año</h2>
            </Link>
            <Link href={`/${currentAparato}/${currentYear}/${currentVuelta}`} className='card'>
              <div className='icon-vuelta'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <h2 className='h-title'>Vuelta</h2>
            </Link>
          </div>
        </div>
        
      </section>
    </>
  );
}
