import React, { useState } from 'react';
import "../../css/enrollment/enrollment.css";
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

function Enrollment() {
    const [enrolledSubjects, setEnrolledSubjects] = useState([
        { code: "CS 311", description: "Software Engineering 1", units: 3, section: "BSCS-3A-M", schedule: "M/Th 10:00-11:30" },
        { code: "CS 312", description: "Operating Systems", units: 3, section: "BSCS-3A-M", schedule: "T/F 13:00-14:30" },
        { code: "CS 313", description: "Automata Theory", units: 3, section: "BSCS-3A-M", schedule: "Wed 08:00-11:00" },
        { code: "CS 314", description: "Web Development", units: 3, section: "BSCS-3A-M", schedule: "M/Th 13:00-14:30" },
        { code: "GE 009", description: "Life and Works of Rizal", units: 3, section: "BSCS-3A-M", schedule: "Sat 09:00-12:00" },
    ]);
    const [showReminder, setShowReminder] = useState(false);
    const [droppedSubjects, setDroppedSubjects] = useState([]); 
    const [isDropping, setIsDropping] = useState(false);
    const [indexSubjectToDrop, setIndexSubjectToDrop] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();
    const isAssessmentPage = location.pathname.includes('/assessment');

    function handleReminderClick() {
        setShowReminder(true);
    }

    function handleDeleteSubject(index) {
        const subjectToDrop = enrolledSubjects[index];
        setDroppedSubjects([...droppedSubjects, subjectToDrop]);
        setEnrolledSubjects(enrolledSubjects.filter((_, i) => i !== index));
    }

    function isDroppingSubject(index) {
        setIsDropping(true);
        setIndexSubjectToDrop(index);
        return;
    }

    function confirmDropping(index) {
        handleDeleteSubject(index);
        setIsDropping(false);
        return;
    }

    function cancelDropping() {
        setIsDropping(false);
        return;
    }

    // If on assessment page, render the Assessment component via Outlet
    if (isAssessmentPage) {
        return <Outlet />;
    }

    return (
        <div className='enrollment-page'>
            {/* --- HEADER SECTION (Student Info) --- */}
            <header className='enrollment-header-card'>
                <div className='student-info-grid'>
                    <div className='info-item'>
                        <h3>Student Name:</h3>
                        <span>Ford Torion</span>
                    </div>
                    
                    <div className='info-item'>
                        <h3>Program:</h3>
                        <span>Bachelor of Science in Computer Science</span>
                    </div>
                    
                    <div className='info-item'>
                        <h3>School Year:</h3>
                        <span>2025-2026</span>
                    </div>

                    <div className='info-item'>
                        <h3>Status:</h3>
                        <span className='status-tag'>Regular</span>
                    </div>

                    <div className='info-item'>
                        <h3>Units:</h3>
                        <span>21 (Allowed)</span>
                    </div>
                    
                    <div className='info-item'>
                        <h3>Student Number:</h3>
                        <span>TUPM - 23 - 1690</span>
                    </div>

                    <div className='info-item'>
                        <h3>Year Level:</h3>
                        <span>3rd</span>
                    </div>

                    <div className='info-item'>
                        <h3>Semester:</h3>
                        <span>First</span>
                    </div>

                    <div className='info-item'>
                        <h3>Section:</h3>
                        <span>BSCS-3A-M</span>
                    </div>
                </div>

                <div className='enrollment-actions'>
                    <div className='select-group'>
                        <select name="schoolYear" id="schoolYear" defaultValue={"2526"}>
                            <option value="2526">2025 - 2026</option>
                            <option value="2425">2024 - 2025</option>
                            <option value="2324">2023 - 2024</option>
                        </select>

                        <select name="semester" id="semester" defaultValue={"First"}>
                            <option>First Semester</option>
                            <option>Second Semester</option>
                            <option>Summer</option>
                        </select>
                    </div>

                    <div className='button-group'>
                        <button className='primary-btn'>Certificate of Registration</button>
                        <button className='secondary-btn' onClick={() => navigate("/enrollment/assessment")}>View Assessment</button>
                        <button className='tertiary-btn' onClick={() => {handleReminderClick()}}>Reminder</button>
                    </div>
                </div>
            </header>

            {/* --- SUBJECTS SECTION --- */}
            <div className='subject-containers'>
                
                {/* Registered Subjects Table */}
                <div className='registered-sub-container'>
                    <h2 className='section-title'>Registered Subjects</h2>
                    <div className='table-wrapper'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Units</th>
                                    <th>Section</th>
                                    <th>Schedule</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrolledSubjects.map((sub, index) => (
                                    <tr key={index}>
                                        <td className='sub-code'>{sub.code}</td>
                                        <td>{sub.description}</td>
                                        <td>{sub.units}</td>
                                        <td>{sub.section}</td>
                                        <td>{sub.schedule}</td>
                                        <td><button className="delete-btn" 
                                                onClick={() => isDroppingSubject(index)}> Drop
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Dropped Subjects (Placeholder) */}
                <div className='drop-sub-container'>
                    <h2 className='section-title'>Dropped Subjects</h2>
                    { droppedSubjects.length === 0 ? (
                        <div className='empty-state'>
                            <p>No dropped subjects for this term.</p>
                        </div>
                    ) : (droppedSubjects.map((sub, index) => (
                        <div key={index} className='dropped-sub-item'>
                            <span className='sub-code'>{sub.code}</span> - {sub.description}
                        </div>
                    )))}
                </div>
            </div>
            
            {showReminder && (
                <div className="reminder-modal-overlay">
                    <div className="reminder-modal-content">
                        
                        <div className="reminder-header">
                            <h2>
                                {/* Optional: Add a warning icon */}
                                <span role="img" aria-label="alert">⚠️</span> 
                                Enrollment Reminder
                            </h2>
                            <button onClick={() => setShowReminder(false)} className="close-btn">✕</button>
                        </div>

                        <div className="reminder-body">
                            <p>
                                For students with <strong>2 failing grades</strong> and/or <strong>3 dropped subjects</strong>, 
                                please proceed to the <strong>Registrar Office</strong> for the Student Agreement Form.
                            </p>
                        </div>

                        <div className="reminder-footer">
                            <button onClick={() => setShowReminder(false)} className="confirm-btn">
                                Understood
                            </button>
                        </div>

                    </div>
                </div>
            )} 

            {isDropping && (
                <div className="dropping-modal-overlay">
                    <div className="dropping-modal-content">
                        
                        <div className="dropping-header">
                            {/* Large Warning Icon */}
                            <div className="warning-icon">!</div>
                            <h2>Are you sure you want to drop this subject?</h2>
                        </div>

                        <div className="dropping-body">
                            <p>You will no longer be able to attend this subject once dropped.</p>
                            <p className="sub-text">Please proceed to the Registrar Office for the student queries.</p>
                        </div>

                        <div className="dropping-footer">
                            <button onClick={() => cancelDropping()} className="cancel-btn">
                                Cancel
                            </button>
                            <button onClick={() => confirmDropping(indexSubjectToDrop)} className="drop-confirm-btn">
                                Yes, Drop Subject
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default Enrollment;