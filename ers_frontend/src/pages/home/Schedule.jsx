import "../../css/home/Schedule.css";

export default function Schedule() {
    const scheduleData = [
        { code: "CC311", units: 1, desc: "Web Development (Lab)", faculty: "Edward Cruz", schedule: "Thu 9:00am - 12:00pm", room: "N/A", modality: "ONLINE" },
        { code: "CC312", units: 2, desc: "Web Development (Lec)", faculty: "Edward Cruz", schedule: "Tue 3:00pm - 5:00pm", room: "326", modality: "ONLINE" },
        { code: "CS352", units: 2, desc: "Software Engineering 1 (Lec)", faculty: "Dolores Montesines", schedule: "Tue 7:00pm - 8:00pm", room: "N/A", modality: "ONLINE" },
        { code: "CS351L", units: 1, desc: "Software Engineering 1 (Lab)", faculty: "Dolores Montesines", schedule: "Wed 5:00pm - 8:00pm", room: "324", modality: "F2F" },
        { code: "CS333", units: 3, desc: "Data Analytics", faculty: "Jan Eilbert Lee", schedule: "Fri 9:00pm - 12:00pm", room: "326", modality: "F2F" },
        { code: "CC313", units: 3, desc: "Info Assurance", faculty: "Michael Narisma", schedule: "Thu 5:00pm - 8:00pm", room: "N/A", modality: "ONLINE" },
    ];

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