"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function PredictPage() {
  const [featureColumns, setFeatureColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictedSalary, setPredictedSalary] = useState(null);

  const [formData, setFormData] = useState({
    age: "",
    experience: "",
    education: "Bachelor's",
    gender: "Male",
    jobTitle: "",
  });

  // 1. Load the exact feature list
  useEffect(() => {
    fetch("/feature_columns.json")
      .then((res) => res.json())
      .then((cols) => setFeatureColumns(cols));
  }, []);

  // 2. Handle form changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 3. Encode raw formData into the full vector
  const encodeFormData = () => {
    const enc = {};

    // Numeric
    enc["Age"] = parseFloat(formData.age);
    enc["Years of Experience"] = parseFloat(formData.experience);

    // Ordinal
    const educationOrder = ["Bachelor's", "Master's", "PhD"];
    enc["Education Level"] = educationOrder.indexOf(formData.education);

    // One-hot for Gender
    enc["Gender_Male"] = formData.gender === "Male" ? 1 : 0;
    enc["Gender_Female"] = formData.gender === "Female" ? 1 : 0;

    // Figure out all job-title columns from featureColumns
    // and one-hot encode
    featureColumns
      .filter((c) => c.startsWith("Job Title_"))
      .forEach((col) => {
        const title = col.replace("Job Title_", "");
        enc[col] = formData.jobTitle === title ? 1 : 0;
      });

    // 4. Build final payload in the exact order
    const payload = {};
    featureColumns.forEach((col) => {
      payload[col] = enc[col] != null ? enc[col] : 0;
    });

    return payload;
  };

  // 5. Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictedSalary(null);

    try {
      const payload = encodeFormData();
      const res = await fetch("https://salary-prediction-app-backend.onrender.com/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setPredictedSalary(data.predicted_salary);
    } catch {
      alert("Prediction failed—please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>💼 AI Salary Predictor</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="Enter your age"
            required
            value={formData.age}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="experience">Years of Experience</label>
          <input
            id="experience"
            name="experience"
            type="number"
            placeholder="Enter experience"
            required
            value={formData.experience}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="education">Education Level</label>
          <select
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className={styles.select}
          >
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
          </select>
        </div>
        <div className={styles.group}>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.select}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className={styles.group}>
          <label htmlFor="jobTitle">Job Title</label>
          <select
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            required
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">-- select --</option>
            {featureColumns
              .filter((c) => c.startsWith("Job Title_"))
              .map((col) => col.replace("Job Title_", ""))
              .map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Predicting..." : "Predict Salary"}
        </button>
      </form>

      {predictedSalary != null && (
        <div className={styles.result}>
          💰 Predicted Salary (USD/year):{" "}
          <span>${Math.round(predictedSalary).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
