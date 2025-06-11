'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'
import { Menu, X } from 'lucide-react' // You can replace this with any icon lib you prefer

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        💼 SalaryPredictor
      </Link>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <div className={`${styles.links} ${menuOpen ? styles.active : ''}`}>
        <Link href="/predict" onClick={() => setMenuOpen(false)}>Predict Salary</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
      </div>
    </nav>
  )
}

