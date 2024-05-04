'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function NavLinks() {
  const pathname = usePathname()
 
  return (
    <nav className="absolute right-3 p-3 nav-links">
      <ul className="flex gap-6 justify-end">
        <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link></li>
        <li><Link className={`link ${pathname.includes('/aparato') ? 'active' : ''}`} href="/506">Aparato</Link></li>
        <li><Link className={`link ${pathname.includes('/ano') ? 'active' : ''}`} href="/506/2024">Año</Link></li>
        <li><Link className={`link ${pathname.includes('/vuelta') ? 'active' : ''}`} href="/506/2024/8">Vuelta</Link></li>
      </ul>
    </nav>
    
  )
}

