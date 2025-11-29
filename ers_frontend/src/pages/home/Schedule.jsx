import "../../css/home/Schedule.css";

export const scheduleData = [
    { code: "CS373-M", units: 3, desc: "Parallel and Distributed Computing", faculty: "AUSTRIA, RONN KEVIN J.", schedule: "Wed 11:00PM - 02:00PM", room: "ONLINE", modality: "ONLINE", day: "Wednesday" },
    { code: "CS351L-M", units: 1, desc: "Software Engineering 1, Laboratory", faculty: "MONTESINES, DOLORES L.", schedule: "Wed 05:00PM - 08:00PM", room: "TBA", modality: "F2F", day: "Wednesday" },
    { code: "CS352-M", units: 2, desc: "Software Engineering 1, Lecture", faculty: "MONTESINES, DOLORES L.", schedule: "Tue 07:00PM - 08:00PM", room: "324", modality: "F2F", day: "Tuesday" },
    { code: "CC311L-M", units: 1, desc: "Web Development, Laboratory", faculty: "CRUZ, EDWARD N.", schedule: "Tue 03:00PM - 05:00PM", room: "326", modality: "F2F", day: "Tuesday" },
    { code: "CC312-M", units: 2, desc: "Web Development, Lecture", faculty: "CRUZ, EDWARD N.", schedule: "Fri 01:00PM - 04:00PM", room: "326", modality: "F2F", day: "Friday" },
    { code: "CSE1-M", units: 3, desc: "CS Professional Elective 1", faculty: "FABREGAS, VAL PATRICK F.", schedule: "Sat 12:00PM - 03:00PM", room: "324", modality: "F2F", day: "Saturday" },
    { code: "CSE2-M", units: 3, desc: "CS Professional Elective 2", faculty: "ONGCO, GIRALYN R.", schedule: "Fri 09:00AM - 12:00PM", room: "TBA", modality: "F2F", day: "Friday" },
    { code: "CS333-M", units: 3, desc: "Data Analytics", faculty: "LEE, JAN EILBERT LIM", schedule: "Thu 05:00PM - 08:00PM", room: "ONLINE", modality: "ONLINE", day: "Thursday" },
    { code: "CS313-M", units: 3, desc: "Information Assurance and Security", faculty: "NARISMA, MICHAEL L.", schedule: "Thu 05:00PM - 08:00PM", room: "ONLINE", modality: "ONLINE", day: "Thursday" },
];

export default function Schedule() {
    // Map full day names to the short codes usually found in schedule strings
    const daysOfWeek = [
    { full: 'Monday', short: 'Mon' },
    { full: 'Tuesday', short: 'Tue' },
    { full: 'Wednesday', short: 'Wed' },
    { full: 'Thursday', short: 'Thu' },
    { full: 'Friday', short: 'Fri' },
    { full: 'Saturday', short: 'Sat' },
    { full: 'Sunday', short: 'Sun' },
    ];

    // Helper to find classes for a specific day
    const getClassesForDay = (shortDay) => {
        return scheduleData.filter(item => item.schedule.includes(shortDay));
    };

    return (
    <div className="schedule-container">
        {/* --- SECTION 1: Enrolled Subjects (Table) --- */}
                <div className="weekly-section">
        <header className="page-header">
            <h1>Weekly Schedule</h1>
        </header>
        
        <div className="weekly-grid">
            {daysOfWeek.map((day) => (
            <div key={day.full} className="day-card">
                <h3 className="day-title">{day.full}</h3>
                <div className="day-content">
                {getClassesForDay(day.short).length > 0 ? (
                    getClassesForDay(day.short).map((cls, idx) => (
                    <div key={idx} className="class-pill">
                        <div className="pill-header">
                        <span className="pill-code">{cls.code}</span>
                        <span className={`pill-modality ${cls.modality.toLowerCase()}`}>{cls.modality}</span>
                        </div>
                        <p className="pill-desc">{cls.desc}</p>
                        <div className="pill-footer">
                        <span>⏰ {cls.schedule.split(day.short)[1] || cls.schedule}</span>
                        <span>📍 {cls.room}</span>
                        </div>
                    </div>
                    ))
                ) : (
                    <div className="empty-day">No classes</div>
                )}
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* --- SECTION 2: Weekly Schedule (Grid) --- */}
        
        <header className="page-header">
        <h1>Enrolled Subjects</h1>
        <span className="unit-count">Total Units: 21</span>
        </header>

        <div className="table-wrapper">
        <table className="responsive-table">
            <thead>
            <tr>
                <th>Subject Code</th>
                <th>Units</th>
                <th>Description</th>
                <th>Faculty</th>
                <th>Schedule</th>
                <th>Room</th>
                <th>Modality</th>
            </tr>
            </thead>
            <tbody>
            {scheduleData.map((item, index) => (
                <tr key={index}>
                <td data-label="Subject Code" className="fw-bold">{item.code}</td>
                <td data-label="Units">{item.units}</td>
                <td data-label="Description" className="desc-col">{item.desc}</td>
                <td data-label="Faculty">{item.faculty}</td>
                <td data-label="Schedule">{item.schedule}</td>
                <td data-label="Room">{item.room}</td>
                <td data-label="Modality">
                    <span className={`badge ${item.modality.toLowerCase()}`}>
                    {item.modality}
                    </span>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

        

    </div>
    );
}