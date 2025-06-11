import styles from './Hero.module.css'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Predict Your Salary Using AI</h1>
      <p className={styles.subtitle}>
        Enter your education, experience, and job details to get an estimated salary using a machine learning model.
      </p>
      <Link href="/predict" className={styles.button}>Try It Now</Link>
    </section>
  )
}
