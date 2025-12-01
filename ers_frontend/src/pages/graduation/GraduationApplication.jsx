// src/pages/GraduationApplication.jsx
import { useState } from 'react';
import './GraduationApplication.css';

const GraduationApplication = () => {
  const [schoolYear, setSchoolYear] = useState('2025 - 2026');
  const [month, setMonth] = useState('January');
  const [term, setTerm] = useState('2nd Semester');
  const [graduationOption, setGraduationOption] = useState('with_ceremony');
  const [phone, setPhone] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [thesisTitle, setThesisTitle] = useState('');
  const [remarks, setRemarks] = useState('');
  const [agree, setAgree] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = e => {
    e.preventDefault();
    // later: send to backend
    handlePrint();
  };

  return (
    <div className="grad-page-shell">
      {/* Faded rounded square behind content, like Profile */}
      <div className="grad-faded-panel">
        <div className="page-section-header">
          <h1 className="page-section-title">Application for Graduation</h1>
          <p className="page-section-subtitle">
            Fill out this form to request evaluation for graduation for the selected term. Changes
            to your application may be coordinated with the Office of the Registrar.
          </p>
        </div>

        <form className="grad-card" onSubmit={handleSubmit}>
          {/* Row 1: School year + term */}
          <div className="grad-field-row">
            <span className="grad-label">School Year :</span>
            <select
              className="grad-select no-arrow"
              value={schoolYear}
              onChange={e => setSchoolYear(e.target.value)}
            >
              <option>2025 - 2026</option>
              <option>2024 - 2025</option>
              <option>2023 - 2024</option>
              <option>2022 - 2023</option>
            </select>
          </div>

          <div className="grad-field-row">
            <span className="grad-label">Term :</span>
            <select
              className="grad-select no-arrow"
              value={term}
              onChange={e => setTerm(e.target.value)}
            >
              <option>1st Semester</option>
              <option>2nd Semester</option>
              <option>Midyear</option>
            </select>
          </div>

          {/* Row 2: Month */}
          <div className="grad-field-row">
            <span className="grad-label">Month :</span>
            <select
              className="grad-select no-arrow"
              value={month}
              onChange={e => setMonth(e.target.value)}
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>

          {/* Row 3: Graduation option */}
          <div className="grad-field-row">
            <span className="grad-label">Graduation Option :</span>
            <div className="grad-radio-group">
              <label className="grad-radio-pill">
                <input
                  type="radio"
                  name="gradOption"
                  value="with_ceremony"
                  checked={graduationOption === 'with_ceremony'}
                  onChange={e => setGraduationOption(e.target.value)}
                />
                <span>With Commencement Ceremony</span>
              </label>
              <label className="grad-radio-pill">
                <input
                  type="radio"
                  name="gradOption"
                  value="in_absentia"
                  checked={graduationOption === 'in_absentia'}
                  onChange={e => setGraduationOption(e.target.value)}
                />
                <span>In Absentia</span>
              </label>
            </div>
          </div>

          {/* Contact information */}
          <div className="grad-section-divider" />

          <div className="grad-two-column">
            <div className="grad-field-column">
              <label className="grad-label-block">Mobile Number :</label>
              <input
                className="grad-input"
                type="text"
                placeholder="09XX XXX XXXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className="grad-field-column">
              <label className="grad-label-block">Current Address :</label>
              <input
                className="grad-input"
                type="text"
                placeholder="House / Street / City / Province"
                value={currentAddress}
                onChange={e => setCurrentAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Thesis / Capstone and remarks */}
          <div className="grad-two-column grad-top-space">
            <div className="grad-field-column">
              <label className="grad-label-block">
                Thesis / Capstone Title <span className="grad-optional">(if applicable)</span>
              </label>
              <textarea
                className="grad-textarea"
                rows={2}
                value={thesisTitle}
                onChange={e => setThesisTitle(e.target.value)}
              />
            </div>
            <div className="grad-field-column">
              <label className="grad-label-block">
                Remarks to Evaluator <span className="grad-optional">(optional)</span>
              </label>
              <textarea
                className="grad-textarea"
                rows={2}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
              />
            </div>
          </div>

          {/* Declaration / consent */}
          <div className="grad-section-divider" />

          <div className="grad-declaration">
            <p>
              By submitting this form, I certify that I am applying for graduation for the term
              indicated above and that, to the best of my knowledge, I will have completed all
              academic and non-academic requirements as prescribed by my curriculum and the
              University.
            </p>
            <label className="grad-checkbox-row">
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
              />
              <span>
                I confirm that the information I have provided is true and correct, and I understand
                that any discrepancy may delay or forfeit my graduation application.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="grad-actions-row">
            <button
              type="submit"
              className="primary-pill-btn"
              disabled={!agree}
            >
              Submit &amp; Print Form
            </button>
            <button
              type="button"
              className="secondary-outline-btn"
              onClick={handlePrint}
            >
              Print Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GraduationApplication;
