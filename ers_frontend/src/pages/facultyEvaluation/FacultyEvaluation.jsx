// src/pages/evaluation/FacultyEvaluation.jsx
import { useState } from 'react';
import './FacultyEvaluation.css';

const FacultyEvaluation = () => {
  const [schoolYear, setSchoolYear] = useState('2025 - 2026');
  const [semester, setSemester] = useState('First');
  const [professor, setProfessor] = useState('Duron, Miller');

  const initialRatings = {
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
  };

  const [ratings, setRatings] = useState(initialRatings);

  const handleRatingChange = (questionKey, value) => {
    setRatings(prev => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const ratingValues = [5, 4, 3, 2, 1];

  const handleSubmit = e => {
    e.preventDefault();
  };

  const renderRatingRow = (questionKey) => (
    <div className="fe-rating-row">
      <span className="fe-side-label fe-side-label-left">Outstanding</span>

      <div className="fe-rating-center">
        {ratingValues.map(value => (
          <div key={value} className="fe-rating-option">
            <span className="fe-rating-number">{value}</span>
            <label className="fe-radio-wrapper">
              <input
                type="radio"
                name={questionKey}
                value={value}
                checked={ratings[questionKey] === value}
                onChange={() => handleRatingChange(questionKey, value)}
              />
              <span className="fe-custom-radio" />
            </label>
          </div>
        ))}
      </div>

      <span className="fe-side-label fe-side-label-right">Needs Improvement</span>
    </div>
  );

  return (
    <div className="fe-page-shell">
      <div className="fe-faded-panel">
        <header className="fe-header-row">
          <h1 className="fe-title">Faculty Evaluation</h1>
        </header>

        <form className="fe-card" onSubmit={handleSubmit}>
          {/* Top controls row */}
          <div className="fe-top-controls">
            <div className="fe-field-row">
              <span className="fe-label">School Year :</span>
              <select
                className="fe-select no-arrow"
                value={schoolYear}
                onChange={e => setSchoolYear(e.target.value)}
              >
                <option>2025 - 2026</option>
                <option>2024 - 2025</option>
                <option>2023 - 2024</option>
              </select>
            </div>

            <div className="fe-field-row">
              <span className="fe-label">Semester :</span>
              <select
                className="fe-select no-arrow"
                value={semester}
                onChange={e => setSemester(e.target.value)}
              >
                <option>First</option>
                <option>Second</option>
                <option>Midyear</option>
              </select>
            </div>

            <div className="fe-field-row fe-field-row-prof">
              <span className="fe-label">Professor :</span>
              <select
                className="fe-select no-arrow"
                value={professor}
                onChange={e => setProfessor(e.target.value)}
              >
                <option>Duron, Miller</option>
                <option>Garcia, Anne</option>
                <option>Santos, Juan</option>
              </select>
            </div>
          </div>

          {/* Legend row */}
          <div className="fe-legend-row">
            <span className="fe-legend-label">Rating scale:</span>
            <span>5 – Outstanding</span>
            <span>4 – Very Satisfactory</span>
            <span>3 – Satisfactory</span>
            <span>2 – Fair</span>
            <span>1 – Needs Improvement</span>
          </div>

          {/* Question blocks */}
          <div className="fe-questions-scroll">
            {/* Q1 */}
            <div className="fe-question-block">
              <div className="fe-question-text">
                This professor displays professionalism by grading the students with a just scoring
                system.
              </div>
              {renderRatingRow('q1')}
            </div>

            {/* Q2 */}
            <div className="fe-question-block">
              <div className="fe-question-text">
                This professor has a light-hearted way of teaching, encouraging students to attend
                his/her classes, promoting a healthy educational environment.
              </div>
              {renderRatingRow('q2')}
            </div>

            {/* Q3 */}
            <div className="fe-question-block">
              <div className="fe-question-text">
                This professor is not easily provoked, heated, and infuriated when the classroom air
                conditioner&apos;s fans are put down.
              </div>
              {renderRatingRow('q3')}
            </div>

            {/* Q4 */}
            <div className="fe-question-block">
              <div className="fe-question-text">
                This professor communicates course expectations, grading policies, and deadlines
                clearly at the beginning of the term.
              </div>
              {renderRatingRow('q4')}
            </div>

            {/* Q5 */}
            <div className="fe-question-block">
              <div className="fe-question-text">
                This professor provides timely and constructive feedback that helps students improve
                their performance.
              </div>
              {renderRatingRow('q5')}
            </div>
          </div>

          {/* Submit */}
          <div className="fe-actions-row">
            <button type="submit" className="fe-submit-btn">
              Submit Evaluation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyEvaluation;
