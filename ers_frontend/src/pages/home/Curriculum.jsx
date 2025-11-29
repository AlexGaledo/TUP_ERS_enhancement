import "../../css/home/Curriculum.css";

const curriculumData = [
    {
        year: "First Year",
        terms: [
            {
                term: "First Term",
                subjects: [
                    { code: "CC131L-M", description: "Computer Programming 1, Lab", units: 1 },
                    { code: "CC132-M", description: "Computer Programming 1, Lec", units: 2 },
                    { code: "MATHA05S-M", description: "Fundamentals of Math Analysis", units: 5 },
                    { code: "CC113-M", description: "Introduction to Computing", units: 3 },
                    { code: "GEC4-M", description: "Mathematics in the Modern World", units: 3 },
                    { code: "PATHFIT1-M", description: "Physical Activities Toward Health and Fitness 1", units: 2 },
                    { code: "GEC7-M", description: "Science, Technology and Society", units: 3 },
                    { code: "GEC1-M", description: "Understanding the Self", units: 3 },
                    { code: "NSTP1-M", description: "National Service Training Program 1", units: 3 },
                ],
            },
            {
                term: "Second Term",
                subjects: [
                    { code: "CC141L-M", description: "Computer Programming 2, Laboratory", units: 1 },
                    { code: "CC142-M", description: "Computer Programming 2, Lecture", units: 2 },
                    { code: "MATHA35-M", description: "Differential and Integral Calculus", units: 5 },
                    { code: "CC103-M", description: "Discrete Structures", units: 3 },
                    { code: "CS123-M", description: "Linear Algebra", units: 3 },
                    { code: "PATHFIT2-M", description: "Physical Activities Toward Health and Fitness 2", units: 2 },
                    { code: "GEC5-M", description: "Purposive Communication", units: 3 },
                    { code: "GEC2-M", description: "Readings in Philippine History", units: 3 },
                    { code: "GEC3-M", description: "The Contemporary World", units: 3 },
                    { code: "NSTP2-M", description: "National Service Training Program 2", units: 3 },
                ],
            },
        ],
    },
    {
        year: "Second Year",
        terms: [
            {
                term: "First Term",
                subjects: [
                    { code: "GEC6-M", description: "Art Appreciation", units: 3 },
                    { code: "CS233-M", description: "Combinatorics and Graph Theory", units: 3 },
                    { code: "CS271L-M", description: "Computer Architecture and Organization, Lab", units: 1 },
                    { code: "CS272-M", description: "Computer Architecture and Organization, Lec", units: 2 },
                    { code: "CC211L-M", description: "Data Structures and Algorithms, Laboratory", units: 1 },
                    { code: "CC212-M", description: "Data Structures and Algorithms, Lecture", units: 2 },
                    { code: "GEC8-M", description: "Ethics", units: 3 },
                    { code: "CS213-M", description: "Human Computer Interaction", units: 3 },
                    { code: "CS251L-M", description: "Object Oriented Programming, Laboratory", units: 1 },
                    { code: "CS252-M", description: "Object Oriented Programming, Lecture", units: 2 },
                    { code: "PATHFIT3-M", description: "Physical Activity Towards Health and Fitness 3", units: 2 },
                ],
            },
            {
                term: "Second Term",
                subjects: [
                    { code: "CC223-M", description: "Applications Development and Emerging Technologies", units: 3 },
                    { code: "CS243-M", description: "Design and Analysis of Algorithms", units: 3 },
                    { code: "CC201L-M", description: "Information Management, Laboratory", units: 1 },
                    { code: "CC202-M", description: "Information Management, Lecture", units: 2 },
                    { code: "CS261L-M", description: "Networks and Communications, Laboratory", units: 1 },
                    { code: "CS262-M", description: "Networks and Communications, Lecture", units: 2 },
                    { code: "CS201L-M", description: "Operating Systems, Laboratory", units: 1 },
                    { code: "CS202-M", description: "Operating Systems, Lecture", units: 2 },
                    { code: "PATHFIT4-M", description: "Physical Activities Toward Health and Fitness 4", units: 2 },
                    { code: "MATHSTAT03-M", description: "Probability and Statistics", units: 3 },
                    { code: "CS221L-M", description: "Programming Language (Design and Implementation), Lab", units: 1 },
                    { code: "CS222-M", description: "Programming Language (Design and Implementation), Lec", units: 2 },
                ],
            },
        ],
    },
    {
        year: "Third Year",
        terms: [
            {
                term: "First Term",
                subjects: [
                    { code: "CSE1-M", description: "CS Professional Elective 1", units: 3 },
                    { code: "CSE2-M", description: "CS Professional Elective 2", units: 3 },
                    { code: "CS333-M", description: "Data Analytics", units: 3 },
                    { code: "CS313-M", description: "Information Assurance and Security", units: 3 },
                    { code: "CS373-M", description: "Parallel and Distributed Computing", units: 3 },
                    { code: "CS351L-M", description: "Software Engineering 1, Laboratory", units: 1 },
                    { code: "CS352-M", description: "Software Engineering 1, Lecture", units: 2 },
                    { code: "CC311L-M", description: "Web Development, Laboratory", units: 1 },
                    { code: "CC312-M", description: "Web Development, Lecture", units: 2 },
                ],
            },
            {
                term: "Second Term",
                subjects: [
                    { code: "CS321L-M", description: "Artificial Intelligence, Laboratory", units: 1 },
                    { code: "CS322-M", description: "Artificial Intelligence, Lecture", units: 2 },
                    { code: "CS303-M", description: "Automata Theory and Formal Language", units: 3 },
                    { code: "CSE3-M", description: "CS Professional Elective 3", units: 3 },
                    { code: "CSE4-M", description: "CS Professional Elective 4", units: 3 },
                    { code: "CC303-M", description: "Methods of Research in Computing", units: 3 },
                    { code: "CS343-M", description: "Modeling and Simulation", units: 3 },
                    { code: "CS361L-M", description: "Software Engineering 2, Laboratory", units: 1 },
                    { code: "CS362-M", description: "Software Engineering 2, Lecture", units: 2 },
                ],
            },
        ],
    },
    {
        year: "Fourth Year",
        terms: [
            {
                term: "First Term",
                subjects: [
                    { code: "GEM14-M", description: "Life and Works of Rizal", units: 3 },
                    { code: "GEE11D-M", description: "Living in the IT Era", units: 3 },
                    { code: "GEE13D-M", description: "Reading Visual Arts", units: 3 },
                    { code: "CS433-M", description: "Social and Professional Issues", units: 3 },
                    { code: "GEE12D-M", description: "The Entrepreneurial Mind", units: 3 },
                    { code: "CS413-M", description: "Thesis Writing 1", units: 3 },
                ],
            },
            {
                term: "Second Term",
                subjects: [
                    { code: "CS406-M", description: "Supervised Industrial Training (486 hours)", units: 6 },
                    { code: "CS423-M", description: "Thesis Writing 2", units: 3 },
                ],
            },
        ],
    },
];

export default function Curriculum() {
    return (
        <div className="curriculum-page-container">
            {curriculumData.map((yearData, yearIndex) => (
                <div key={yearIndex} className="curriculum-year">
                    <h2 className="curriculum-year-title">{yearData.year}</h2>
                    {yearData.terms.map((termData, termIndex) => (
                        <div key={termIndex} className="curriculum-term">
                            <h3 className="curriculum-term-title">{termData.term}</h3>
                            <div className="curriculum-table-wrapper">
                                <table className="curriculum-table curriculum-desktop-view">
                                    <thead>
                                        <tr>
                                            <th>Subject Code</th>
                                            <th>Description</th>
                                            <th>Units</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {termData.subjects.map((subject, subjectIndex) => (
                                            <tr key={subjectIndex}>
                                                <td>{subject.code}</td>
                                                <td>{subject.description}</td>
                                                <td>{subject.units}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="curriculum-mobile-view">
                                    {termData.subjects.map((subject, subjectIndex) => (
                                        <div key={subjectIndex} className="curriculum-card">
                                            <div className="curriculum-card-header">{subject.code}</div>
                                            <div className="curriculum-card-body">
                                                <p><span className="column-name">Description:</span> <span className="column-value">{subject.description}</span></p>
                                                <hr />
                                                <p><span className="column-name">Units:</span> <span className="column-value">{subject.units}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}