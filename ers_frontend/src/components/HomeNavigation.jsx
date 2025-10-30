import React, { useState, useRef, useEffect } from "react";
import announcementIcon from "../assets/announcementIcon.svg";
import scheduleIcon from "../assets/scheduleIcon.svg";
import gradesIcon from "../assets/gradesIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import curriculumIcon from "../assets/curriculumIcon.svg";

const NAV_TABS = [
    { href: "/home/announcement", label: "Announcement", icon: announcementIcon },
    { href: "/home/schedule", label: "Schedule", icon: scheduleIcon },
    { href: "/home/grades", label: "Grades", icon: gradesIcon },
    { href: "/home/calendar", label: "Calendar", icon: calendarIcon },
    { href: "/home/curriculum", label: "Curriculum", icon: curriculumIcon },
];

export default function HomeNavigation() {
    const [open, setOpen] = useState(false);
    const [selectedPath, setSelectedPath] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/home/announcement'));
    const rootRef = useRef(null);

    useEffect(() => {
        function onDocClick(e) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    useEffect(() => {
        // keep selectedPath in sync if user navigates externally
        const handler = () => setSelectedPath(window.location.pathname);
        window.addEventListener('popstate', handler);
        return () => window.removeEventListener('popstate', handler);
    }, []);

    const onChoose = (href) => {
        setSelectedPath(href);
        setOpen(false);
        // navigate
        window.location.href = href;
    };

    return (
        <>
            {/* desktop / tablet tab list - hidden on small screens via CSS */}
            <div className="home-navigation-tabs">
                {NAV_TABS.map((t) => (
                    <a key={t.href} href={t.href} className="home-tab-container">
                        <img src={t.icon} alt={t.label} />
                        <p>{t.label}</p>
                    </a>
                ))}
            </div>

            {/* mobile custom dropdown - hidden on larger screens via CSS */}
            <div className="home-navigation-select" ref={rootRef}>
                <button
                    type="button"
                    className="dropdown-button"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => setOpen((s) => !s)}
                >
                    {(() => {
                        const sel = NAV_TABS.find((n) => n.href === selectedPath) || NAV_TABS[0];
                        return (
                            <>
                                <img src={sel.icon} alt="" aria-hidden="true" />
                                <span className="dropdown-button-label">{sel.label}</span>
                            </>
                        );
                    })()}
                    <span className="dropdown-caret" aria-hidden>▼</span>
                </button>

                <div className={`dropdown-menu ${open ? 'open' : ''}`} role="listbox" aria-label="Home navigation options">
                    {NAV_TABS.map((t) => {
                        const active = t.href === selectedPath;
                        return (
                            <div
                                key={t.href}
                                role="option"
                                aria-selected={active}
                                tabIndex={0}
                                onClick={() => onChoose(t.href)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onChoose(t.href); }}
                                className={`dropdown-item ${active ? 'active' : ''}`}
                            >
                                <img src={t.icon} alt="" aria-hidden="true" />
                                <span>{t.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}