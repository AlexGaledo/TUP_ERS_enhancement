// TUP_ERS_enhancement\ers_frontend

import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/enrollment/assessment.css";

function Assessment() {
    const navigate = useNavigate();
    
    const enrolledSubjects = [
        {   code: 'CS101', 
            unit: 1, 
            description: 'Introduction to Computer Science', 
            Faculty: 'Dr. Smith', 
            schedule: 'MWF 9:00-10:00', 
            room: 'Room 101',
            modality: 'ONLINE' },
            
        {   code: 'MATH201', 
            unit: 2, 
            description: 'Calculus II', 
            Faculty: 'Prof. Johnson', 
            schedule: 'TTh 11:00-12:30', 
            room: 'Room 202',            
            modality: 'F2F' },

        {   code: 'ENG150', 
            unit: 3, 
            description: 'Technical Writing', 
            Faculty: 'Ms. Lee', 
            schedule: 'MWF 10:00-11:00', 
            room: 'Room 303',
            modality: 'ONLINE' },
    ];

    return (
        <div className='enrollment-assessment-page'>
            
            {/* --- HEADER SECTION --- */}
            <header className='enrollment-header-card'>
                <div className='student-info-grid'>
                    <div className='info-item'>
                        <h3>Student Name:</h3><span>Ford Torion</span>
                    </div>
                    <div className='info-item'>
                        <h3>Program:</h3><span>Bachelor of Science in Computer Science</span>
                    </div>
                    <div className='info-item'>
                        <h3>Student Number:</h3><span>TUPM - 23 - 1690</span>
                    </div>
                    <div className='info-item'>
                        <h3>Status:</h3><span className='status-tag'>Regular</span>
                    </div>
                    <div className='info-item'>
                        <h3>Units:</h3><span>21 (Allowed)</span>
                    </div>
                    <div className='info-item'>
                        <h3>Year Level:</h3><span>3rd</span>
                    </div>
                    <div className='info-item'>
                        <h3>Semester:</h3><span>First</span>
                    </div>
                    <div className='info-item'>
                        <h3>Section:</h3><span>BSCS-3A-M</span>
                    </div>
                    <div className='info-item'>
                        <h3>School Year:</h3><span>2025-2026</span>
                    </div>
                </div>
                <button className='backBtn' onClick={() => navigate('/enrollment')}>
                    <span className='back-arrow'>←</span>
                    Back To Enrollment
                </button>
            </header>
            
            {/* --- SUBJECTS TABLE --- */}
            <div className='enrollment-assessment-subjects-card'>
                <div className="card-header">
                    <h2>Enrolled Subjects</h2>
                </div>
                <div className="table-wrapper">
                    <table className='subjects-table'>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Unit</th>
                                <th>Description</th>
                                <th>Faculty</th>
                                <th>Schedule</th>
                                <th>Room</th>
                                <th>Modality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledSubjects.map((subject, index) => (
                                <tr key={index}>
                                    <td className="code-col">{subject.code}</td>
                                    <td className="center-col">{subject.unit}</td>
                                    <td>{subject.description}</td>
                                    <td>{subject.Faculty}</td>
                                    <td>{subject.schedule}</td>
                                    <td>{subject.room}</td>
                                    <td>
                                        <span className={`modality-badge ${subject.modality}`}>
                                            {subject.modality}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- FEES SUMMARY SECTION --- */}
            <div className='fees-section'>
                
                {/* 1. Tuition Fee */}
                <div className='fee-group'>
                    <div className='fee-row highlight'>
                        <h2>Tuition Fees Summary</h2> 
                        <span className="price">Php 3,750.00</span>
                    </div>
                </div>

                {/* 2. Other Fees */}
                <div className='fee-group'>
                    <h3 className="group-label">Other Fees</h3>
                    
                    <div className="fee-list">
                        <div className='fee-row'>
                            <h4>Laboratory Fee</h4>
                            <span>Php 400.00</span>
                        </div>

                        <div className='fee-row'>
                            <h4>Information Assurance</h4>
                            <span>Php 400.00</span>
                        </div>

                        <div className='fee-row total-sub'>
                            <h3>Total Miscellaneous Fee</h3>
                            <span>Php 800.00</span>
                        </div>
                    </div>
                </div>

                {/* 3. Grand Totals */}
                <div className='fee-summary-footer'>
                    <div className="summary-grid">
                        <div className='summary-item'>
                            <h3>Total Fees</h3>
                            <p>Php 4,550.00</p>
                        </div>

                        <div className='summary-item'>
                            <h3>Amount Due</h3>
                            <p>Php 4,550.00</p>
                        </div>

                        <div className='summary-item grand-total'>
                            <h3>Grand Total</h3>
                            <p>Php 4,550.00</p>
                        </div>

                        <div className='summary-item payment-mode'>
                            <h3>Mode of Payment</h3>
                            <p>Full Payment</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Assessment;