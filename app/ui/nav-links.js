'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function NavLinks() {
  const pathname = usePathname()
 
  return (
    <nav className="absolute right-3 p-3 nav-links">
      <ul className="flex gap-6 justify-end">
        <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link></li>
        <li><Link className={`link ${pathname.includes('/aparato') ? 'active' : ''}`} href="/aparato">Aparato</Link></li>
        <li><Link className={`link ${pathname === '/ano' ? 'active' : ''}`} href="/ano">Año</Link></li>
        <li>Vuelta</li>
      </ul>
    </nav>
    
  )
}

