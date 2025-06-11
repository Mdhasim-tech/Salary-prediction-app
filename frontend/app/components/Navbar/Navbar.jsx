'use client'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
        💼 SalaryPredictor
      </Link>
      <div className={styles.links}>
        <Link href="/predict">Predict</Link>
        <Link href="/about">About Us</Link>
      </div>
    </nav>
  )
}
