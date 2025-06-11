import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About SalaryPredictor AI</h1>

      <section className={styles.section}>
        <h2 className={styles.subheading}>The Problem</h2>
        <p>
          Many job seekers and recruiters struggle to estimate a fair annual salary
          based on factors like education, experience, and job title. Without clear
          guidance, companies may under- or over-pay, and candidates can’t benchmark
          themselves against market standards.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Our Solution</h2>
        <p>
          We built an AI-powered web app that predicts annual salary (in USD) by
          training an XGBoost regression model on Kaggle’s public salary dataset.
          Just enter your details—age, experience, education, gender, and job title—
          and get an instant estimate.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Model Performance</h2>
        <ul className={styles.list}>
          <li><strong>R² Score:</strong> 0.87 (explains 87% of variance)</li>
          <li><strong>RMSE:</strong> ~$17,300</li>
          <li><strong>Baseline (Linear Regression):</strong> R² 0.86, RMSE ~$18,400</li>
        </ul>
        <p className={styles.note}>
          Our XGBoost model outperforms simple linear regression by capturing
          non-linear patterns in the data.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Tech Stack</h2>
        <p>
          <strong>Frontend:</strong> Next.js (App Router), React, CSS Modules <br/>
          <strong>Backend:</strong> Flask, scikit-learn, XGBoost <br/>
          <strong>Model Persistence:</strong> joblib, feature_columns.json <br/>
          <strong>Deployment:</strong> Local development (can be deployed to Vercel + Heroku/Render)
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Future Enhancements</h2>
        <ul className={styles.list}>
          <li>Support multiple currencies & locations</li>
          <li>Allow users to upload resumes for richer feature extraction</li>
          <li>Build an Indian-market model (INR/LPA)</li>
          <li>Interactive salary distribution charts</li>
        </ul>
      </section>
    </div>
  );
}
