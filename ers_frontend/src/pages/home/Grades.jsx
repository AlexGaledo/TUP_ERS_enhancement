import "../../css/home/Grades.css";

export default function Grades() {
    const termsData = [
        {
            term: "First",
            schoolYear: "25-26",
            gpa: "1.47",
            scholasticStatus: "Regular",
            courseCode: "BSCS",
            courseDescription: "Bachelor of Science in Computer Science",
            grades: [
                { code: "CC311", units: 1, desc: "Web Development (Lab)", faculty: "Edward Cruz", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
                { code: "CC312", units: 2, desc: "Web Development (Lec)", faculty: "Edward Cruz", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
                { code: "CS352", units: 2, desc: "Software Engineering 1 (Lec)", faculty: "Dolores Montesines", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
                { code: "CS351L", units: 1, desc: "Software Engineering 1 (Lab)", faculty: "Dolores Montesines", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
                { code: "CS333", units: 3, desc: "Data Analytics", faculty: "Jan Eilbert Lee", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
                { code: "CC313", units: 3, desc: "Information Assurance and Security", faculty: "Michael Narisma", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
                { code: "CC373", units: 3, desc: "Parallel and Distributed Computing", faculty: "None", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
                { code: "CSE1", units: 3, desc: "CS Professional Elective 1", faculty: "Val Patrick Fabregas", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
                { code: "CSE2", units: 3, desc: "CS Professional Elective 2", faculty: "Giralyn Ongco", section: "BSCS-3A-M", grade: "Please Evaluate First", status: "Please Evaluate First" },
            ],
        },
        {
            term: "Second",
            schoolYear: "24-25",
            gpa: "1.45",
            scholasticStatus: "Irregular",
            courseCode: "BSCS",
            courseDescription: "Bachelor of Science in Computer Science",
            grades: [
                { code: "CC201L-M", units: 1, desc: "Information Management, Laboratory", faculty: "DELA CRUZ, FRANCIS LUANGCO", section: "BSCS-2A-M", grade: "5.00", status: "Failed" },
                { code: "CC202-M", units: 2, desc: "Information Management, Lecture", faculty: "DELA CRUZ, FRANCIS LUANGCO", section: "BSCS-2A-M", grade: "5.00", status: "Failed" },
                { code: "CC223-M", units: 3, desc: "Applications Development and Emerging Technologies", faculty: "VIÑAS, MARY JOY DANIEL", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "CS201L-M", units: 1, desc: "Operating Systems, Laboratory", faculty: "PARAGAS, MHONA LIZA", section: "BSCS-2A-M", grade: "1.25", status: "Passed" },
                { code: "CS202-M", units: 2, desc: "Operating Systems, Lecture", faculty: "PARAGAS, MHONA LIZA", section: "BSCS-2A-M", grade: "1.25", status: "Passed" },
                { code: "CS221L-M", units: 1, desc: "Programming Language (Design and Implementation), Lab.", faculty: "CRUZ, EDWARD N", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "CS222-M", units: 2, desc: "Programming Language (Design and Implementation), Lec.", faculty: "CRUZ, EDWARD N", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "CS243-M", units: 3, desc: "Design and Analysis of Algorithms", faculty: "TOMAGAN, ARIEL L", section: "BSCS-2A-M", grade: "1.25", status: "Passed" },
                { code: "CS261L-M", units: 1, desc: "Networks and Communications, Laboratory", faculty: "CRUZ, EDWARD N", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "CS262-M", units: 2, desc: "Networks and Communications, Lecture", faculty: "CRUZ, EDWARD N", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "MATHSTAT03-M", units: 3, desc: "Probability and Statistics", faculty: "DE JESUS, GENER N", section: "BSCS-2A-M", grade: "1.25", status: "Passed" },
                { code: "PATHFIT4-M", units: 3, desc: "Physical Activities Toward Health and Fitness 4", faculty: "LOPEZ, JONATHAN DE GUZMAN", section: "BSCS-2A-M", grade: "1.25", status: "Passed" },
            ],
        },
        {
            term: "First",
            schoolYear: "24-25",
            gpa: "1.40",
            scholasticStatus: "Regular",
            courseCode: "BSCS",
            courseDescription: "Bachelor of Science in Computer Science",
            grades: [
                { code: "CC211L-M", units: 1, desc: "Data Structures and Algorithms, Laboratory", faculty: "RENEGADO, FERNANDO LACBAYO", section: "BSCS-2A-M", grade: "1.25", status: "Passed" },
                { code: "CC212-M", units: 2, desc: "Data Structures and Algorithms, Lecture", faculty: "RENEGADO, FERNANDO LACBAYO", section: "BSCS-2A-M", grade: "1.25", status: "Passed" },
                { code: "CS213-M", units: 3, desc: "Human Computer Interaction", faculty: "DELA CRUZ, FRANCIS LUANGCO", section: "BSCS-2A-M", grade: "1.75", status: "Passed" },
                { code: "CS233-M", units: 3, desc: "Combinatorics and Graph Theory", faculty: "LEE, JAN EILBERT LIM", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "CS251L-M", units: 1, desc: "Object Oriented Programming, Laboratory", faculty: "CRUZ, EDWARD N", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "CS252-M", units: 2, desc: "Object Oriented Programming, Lecture", faculty: "CRUZ, EDWARD N", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "CS271L-M", units: 1, desc: "Computer Architecture and Organization, Lab", faculty: "VIÑAS, MARY JOY DANIEL", section: "BSCS-2A-M", grade: "5.00", status: "Failed" },
                { code: "CS272-M", units: 2, desc: "Computer Architecture and Organization, Lec", faculty: "PARAGAS, MHONA LIZA", section: "BSCS-2A-M", grade: "5.00", status: "Failed" },
                { code: "GEC6-M", units: 3, desc: "Art Appreciation", faculty: "TENGCO, ALMINA TRINIDAD", section: "BSCS-2A-M", grade: "1.25", status: "Passed" },
                { code: "GEC8-M", units: 3, desc: "Ethics", faculty: "GADAINGAN, HAROLD C", section: "BSCS-2A-M", grade: "1.50", status: "Passed" },
                { code: "PATHFIT3-M", units: 2, desc: "Physical Activity Towards Health and Fitness 3", faculty: "TULIAO, JOSHUA A", section: "BSCS-2A-M", grade: "1.00", status: "Passed" },
            ],
        },
        {
            term: "First",
            schoolYear: "23-24",
            gpa: "1.18",
            scholasticStatus: "Regular",
            courseCode: "BSCS",
            courseDescription: "Bachelor of Science in Computer Science",
            grades: [
                { code: "CC113-M", units: 3, desc: "Introduction to Computing", faculty: "CRISOSTOMO, JOHN LEE GAVINO", section: "BSCS-1A-M", grade: "1.00", status: "Passed" },
                { code: "CC131L-M", units: 1, desc: "Computer Programming 1, Lab", faculty: "CRUZ, EDWARD N", section: "BSCS-1A-M", grade: "1.25", status: "Passed" },
                { code: "CC132-M", units: 2, desc: "Computer Programming 1, Lec", faculty: "CRUZ, EDWARD N", section: "BSCS-1A-M", grade: "1.25", status: "Passed" },
                { code: "GEC1-M", units: 3, desc: "Understanding the Self", faculty: "VILLALOBOS, JOSEFINA DIONISIO", section: "BSCS-1A-M", grade: "1.00", status: "Passed" },
                { code: "GEC4-M", units: 3, desc: "Mathematics in the Modern World", faculty: "REAL, OLIVIA DAKANAY", section: "BSCS-1A-M", grade: "1.25", status: "Passed" },
                { code: "GEC7-M", units: 3, desc: "Science, Technology and Society", faculty: "DELA CRUZ, MA KRISTINA", section: "BSCS-1A-M", grade: "1.00", status: "Passed" },
                { code: "MATHA055-M", units: 5, desc: "Fundamentals of Math Analysis", faculty: "REAL, OLIVIA DAKANAY", section: "BSCS-1A-M", grade: "1.50", status: "Passed" },
                { code: "NSTP1-M", units: 3, desc: "National Service Training Program 1", faculty: "INANYOG, REY IVAN G", section: "BETMT-AET-1A-M", grade: "1.50", status: "Passed" },
                { code: "PATHFIT1-M", units: 2, desc: "Physical Activities Toward Health and Fitness 1", faculty: "TULIAO, JOSHUA A", section: "BSCS-1A-M", grade: "1.00", status: "Passed" },
            ],
        },
    ];

    return (
        <div className="grades-page-container">
            {termsData.map((termData, termIndex) => (
                <div key={termIndex} className="grades-content">
                    <div className="grades-header">
                        <p>School Year: <strong>{termData.schoolYear}</strong></p>
                        <p>Semester: <strong>{termData.term}</strong></p>
                        <p>GPA (excludes NSTP and subjects with non-numeric ratings): <strong>{termData.gpa}</strong></p>
                        <p>Course Code: <strong>{termData.courseCode}</strong></p>
                        <p>Course Description: <strong>{termData.courseDescription}</strong></p>
                        <p>Scholastic Status: <strong>{termData.scholasticStatus}</strong></p>
                        
                        <button className="grades-rating-slip-btn">Student's Rating Slip</button>
                    </div>

                    <div className="grades-table-wrapper">
                        <table className="grades-desktop-view">
                            <thead>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Units</th>
                                    <th>Description</th>
                                    <th>Faculty</th>
                                    <th>Section</th>
                                    <th>Grade</th>
                                    <th>Grade Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {termData.grades.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.code}</td>
                                        <td>{item.units}</td>
                                        <td>{item.desc}</td>
                                        <td>{item.faculty}</td>
                                        <td>{item.section}</td>
                                        <td><p className={`grade-pill ${isNaN(item.grade) ? item.grade.toLowerCase().replace(/\s+/g, '-') : ''}`}>{item.grade}</p></td>
                                        <td><p className={`grade-status-pill ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="grades-mobile-view">
                            {termData.grades.map((item, index) => (
                                <div key={index} className="grades-card">
                                    <div className="grades-card-header">{item.code}</div>
                                    <div className="grades-card-body">
                                        <p><span className="column-name">Units:</span> <span className="column-value">{item.units}</span></p>
                                        <hr />
                                        <p><span className="column-name">Description:</span> <span className="column-value">{item.desc}</span></p>
                                        <hr />
                                        <p><span className="column-name">Faculty:</span> <span className="column-value">{item.faculty}</span></p>
                                        <hr />
                                        <p><span className="column-name">Section:</span> <span className="column-value">{item.section}</span></p>
                                        <hr />
                                        <p><span className={`column-value grade-pill ${isNaN(item.grade) ? item.grade.toLowerCase().replace(/\s+/g, '-') : ''}`}>{item.grade}</span></p>
                                        <hr />
                                        <p><span className="column-name">Grade Status:</span> <span className={`column-value grade-status-pill ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}