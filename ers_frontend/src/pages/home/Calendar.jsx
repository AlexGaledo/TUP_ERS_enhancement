import React, { useState } from 'react';
import "../../css/home/Calendar.css";

export default function Calendar() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    const events = [
        // Events for 2025
        {
            title: 'Valentine’s Day',
            description: 'Celebrate Valentine’s Day.',
            date: new Date(2025, 1, 14),
        },
        {
            title: 'Independence Day',
            description: 'National holiday.',
            date: new Date(2025, 5, 12),
        },
        {
            title: 'Preliminary Examination',
            description: 'Preliminary exams for the semester.',
            date: new Date(2025, 8, 15),
        },
        {
            title: 'Midterm Examination',
            description: 'Midterm exams for the semester.',
            date: new Date(2025, 10, 20),
        },
        {
            title: 'Final Examination',
            description: 'Final exams for the semester.',
            date: new Date(2025, 11, 8),
        },
        {
            title: 'Araw ng Kagitingan',
            description: 'Philippine holiday.',
            date: new Date(2025, 3, 9),
        },
        {
            title: 'Labor Day',
            description: 'Philippine holiday.',
            date: new Date(2025, 4, 1),
        },
        {
            title: 'National Heroes Day',
            description: 'Philippine holiday.',
            date: new Date(2025, 7, 31),
        },
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2025, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2025, 0, 29) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2025, 1, 25) },
        { title: "Eid'l Fitr (End of Ramadan)", description: "Regular Holiday (Date TBC)", date: new Date(2025, 2, 31) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2025, 3, 9) },
        { title: "Start of Summer Vacation (DepEd)", description: "School Break Starts", date: new Date(2025, 3, 16) },
        { title: "Maundy Thursday", description: "Regular Holiday", date: new Date(2025, 3, 17) },
        { title: "Good Friday", description: "Regular Holiday", date: new Date(2025, 3, 18) },
        { title: "Black Saturday", description: "Special Non-Working Day", date: new Date(2025, 3, 19) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2025, 4, 1) },
        { title: "National & Local Elections", description: "Special Non-Working Day", date: new Date(2025, 4, 12) },
        { title: "Eid'l Adha (Feast of Sacrifice)", description: "Regular Holiday (Date TBC)", date: new Date(2025, 5, 6) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2025, 5, 12) },
        { title: "Iglesia ni Cristo Founding Anniversary", description: "Special Non-Working Day", date: new Date(2025, 6, 27) },
        { title: "Ninoy Aquino Day", description: "Special Non-Working Day", date: new Date(2025, 7, 21) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2025, 7, 25) },
        { title: "All Saints' Day Eve", description: "Special Non-Working Day", date: new Date(2025, 9, 31) },
        { title: "All Saints' Day", description: "Special Non-Working Day", date: new Date(2025, 10, 1) },
        { title: "All Souls' Day", description: "Special Non-Working Day", date: new Date(2025, 10, 2) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2025, 10, 30) },
        { title: "Feast of the Immaculate Conception", description: "Special Non-Working Day", date: new Date(2025, 11, 8) },
        { title: "Christmas Eve", description: "Special Non-Working Day", date: new Date(2025, 11, 24) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2025, 11, 25) },
        { title: "Rizal Day", description: "Regular Holiday", date: new Date(2025, 11, 30) },
        { title: "Last Day of the Year", description: "Special Non-Working Day", date: new Date(2025, 11, 31) },

        // Events for 2026
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2026, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2026, 1, 10) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2026, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2026, 3, 9) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2026, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2026, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2026, 7, 31) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2026, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2026, 11, 25) },

        // Events for 2027
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2027, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2027, 1, 28) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2027, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2027, 3, 9) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2027, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2027, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2027, 7, 30) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2027, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2027, 11, 25) },

        // Events for 2020
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2020, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2020, 0, 25) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2020, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2020, 3, 9) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2020, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2020, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2020, 7, 31) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2020, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2020, 11, 25) },

        // Events for 2021
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2021, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2021, 1, 12) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2021, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2021, 3, 9) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2021, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2021, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2021, 7, 30) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2021, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2021, 11, 25) },

        // Events for 2022
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2022, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2022, 1, 1) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2022, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2022, 3, 9) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2022, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2022, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2022, 7, 29) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2022, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2022, 11, 25) },

        // Events for 2023
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2023, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2023, 0, 22) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2023, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2023, 3, 10) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2023, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2023, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2023, 7, 28) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2023, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2023, 11, 25) },

        // Events for 2024
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2024, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2024, 1, 10) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2024, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2024, 3, 9) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2024, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2024, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2024, 7, 26) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2024, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2024, 11, 25) },

        // Events for 2028
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2028, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2028, 1, 2) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2028, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2028, 3, 9) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2028, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2028, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2028, 7, 28) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2028, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2028, 11, 25) },

        // Events for 2029
        { title: "New Year’s Day", description: "Regular Holiday", date: new Date(2029, 0, 1) },
        { title: "Chinese New Year", description: "Special Non-Working Day", date: new Date(2029, 1, 13) },
        { title: "EDSA People Power Anniversary", description: "Special Working Day", date: new Date(2029, 1, 25) },
        { title: "Araw ng Kagitingan (Day of Valor)", description: "Regular Holiday", date: new Date(2029, 3, 9) },
        { title: "Labor Day", description: "Regular Holiday", date: new Date(2029, 4, 1) },
        { title: "Independence Day", description: "Regular Holiday", date: new Date(2029, 5, 12) },
        { title: "National Heroes Day", description: "Regular Holiday", date: new Date(2029, 7, 27) },
        { title: "Bonifacio Day", description: "Regular Holiday", date: new Date(2029, 10, 30) },
        { title: "Christmas Day", description: "Regular Holiday", date: new Date(2029, 11, 25) },
    ];

    const renderEvents = (day) => {
        const dayEvents = events.filter(
            (event) => event.date.getDate() === day && event.date.getMonth() === selectedMonth && event.date.getFullYear() === selectedYear
        );

        return dayEvents.map((event, index) => (
            <div key={index} className="calendar-event" title={event.description}>
                <strong>{event.title}</strong>
            </div>
        ));
    };

    const handleMonthSelect = (index) => {
        setSelectedMonth(index);
        setIsMonthOpen(false);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setIsYearOpen(false);
    };

    const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i);

    return (
        <div className="home-calendar-page-container">
            <div className="month-year-selector-row">
                <h2 className="selected-month-year">{months[selectedMonth]} {selectedYear}</h2>
                <div className="month-year-selectors">
                    <div className="month-selector">
                        <label>Select Month: </label>
                        <div className="custom-select-container">
                            <div 
                                className="select-trigger" 
                                onClick={() => setIsMonthOpen(!isMonthOpen)}
                            >
                                <span>{months[selectedMonth]}</span>
                                <span className={`arrow ${isMonthOpen ? 'open' : ''}`}>&#9662;</span>
                            </div>
                            {isMonthOpen && (
                                <ul className="options-list">
                                    {months.map((month, index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => handleMonthSelect(index)}
                                            className={selectedMonth === index ? 'selected' : ''}
                                        >
                                            {month}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="year-selector">
                        <label>Select Year: </label>
                        <div className="custom-select-container">
                            <div 
                                className="select-trigger" 
                                onClick={() => setIsYearOpen(!isYearOpen)}
                            >
                                <span>{selectedYear}</span>
                                <span className={`arrow ${isYearOpen ? 'open' : ''}`}>&#9662;</span>
                            </div>
                            {isYearOpen && (
                                <ul className="options-list">
                                    {years.map((year) => (
                                        <li 
                                            key={year} 
                                            onClick={() => handleYearSelect(year)}
                                            className={selectedYear === year ? 'selected' : ''}
                                        >
                                            {year}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-calendar-page-content">
                <div className="calendar-grid">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="calendar-day-header">
                            {day}
                        </div>
                    ))}
                    {calendarDays.map((day, index) => (
                        <div key={index} className="calendar-day">
                            {day ? (
                                <>
                                    <span className="day-number">
                                        {day}
                                        {calendarDays.length <= 35 && (
                                            <span className="day-label"> {daysOfWeek[(firstDayOfMonth + index) % 7]}</span>
                                        )}
                                    </span>
                                    {renderEvents(day)}
                                </>
                            ) : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};