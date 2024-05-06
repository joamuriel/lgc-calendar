'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { currentYear, currentAparato, currentVuelta } from "@/app/services/dates"
 
export function NavLinks() {
  const pathname = usePathname()
 
  return (
    <nav className="absolute right-3 pt-1 nav-links">
      <ul className="flex gap-6 justify-end">
        <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link></li>
        <li><Link className={`link ${pathname.match(/^\/\d+$/) ? 'active' : ''}`} href={`/${currentAparato}`}>Aparato</Link></li>
        <li><Link className={`link ${pathname.match(/^\/\d+\/\d+$/) ? 'active' : ''}`} href={`/${currentAparato}/${currentYear}`}>Año</Link></li>
        <li><Link className={`link ${pathname.match(/^\/\d+\/\d+\/\d+$/) ? 'active' : ''}`} href={`/${currentAparato}/${currentYear}/${currentVuelta}`}>Vuelta</Link></li>
      </ul>
    </nav>
    
  )
}

