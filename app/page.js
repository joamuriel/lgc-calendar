import { Header } from '@/app/ui/header.js';
import { currentYear, currentDate, currentYearState, currentAparato, currentVuelta, currentDay, currentDayNegative } from "@/app/services/dates"
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header title="Calendaria" />
      <section className='section-full-height py-3 relative flex flex-col md:block'>
        {/* <div className='text-xs md:text-sm mb-12'>
          <p className='font-semibold'>{currentDate}</p>
          <p>Aparato <span className='font-semibold'>{currentAparato}</span></p>
          <p>Año <span className='font-semibold'>{currentYearState} {currentYear}</span></p>
          <p>Vuelta <span className='font-semibold'>{currentVuelta}</span></p>
          <p>Día <span className='font-semibold'>{currentDay} ({currentDayNegative})</span></p>
        </div> */}
        <div className='md:absolute left-0 top-0 h-full w-full justify-center items-center md:flex mt-12 md:mt-6'>
          <div className='grid grid-cols-3 gap-9 md:gap-24 md:w-1/2 mx-auto'>
            <Link href={`/${currentAparato}`} className='card'>
              <div className='icon icon-aparato'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <h2 className='h-title'>Aparato</h2>
            </Link>
            <Link href={`/${currentAparato}/${currentYear}`} className='card'>
              <div className='icon icon-ano'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className='col-span-2'></div>
              </div>
              <h2 className='h-title'>Año</h2>
            </Link>
            <Link href={`/${currentAparato}/${currentYear}/${currentVuelta}`} className='card'>
              <div className='icon icon-vuelta'>
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
