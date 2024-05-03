import { Header } from '@/app/ui/header.js'
import { currentYear } from "@/app/services/dates"
import Link from "next/link";


export default function VueltaPage() {
  return(
    <>
      <Header title="Vueltas" />
      <div className="mb-12 flex gap-12 mt-12">
        <h2 className='title text-lg'>
          <Link href="#">
            Vuelta actual:<br/>
            <span className='text-3xl h-title underline'>vuelta</span>
          </Link>
        </h2>
      </div>
    </>
  )
}