// TUP_ERS_enhancement\ers_frontend

import React, { useState } from 'react';
import "../../css/message/message.css";

// Message Assets
import select from "../../assets/message/selectAll.svg";
// import selectMessage from "../../assets/message/selectmessage.svg"; // Not used in this version
// import dropdown from "../../assets/message/dropdown.svg";
// import line from "../../assets/message/line.svg";
// import check from "../../assets/message/check.svg";
import refresh from "../../assets/message/refresh.svg";
import more from "../../assets/message/moreButton.svg";
import compose from "../../assets/message/compose.svg";   
// import inboxdropdown from "../../assets/message/inbox-dropdown.svg";

function Message() {
    const [messageContentPage, setMessageContentPage] = useState('Inbox');
    const [composeMessageVisible, setComposeMessageVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showMessageContent, setShowMessageContent] = useState(false);
    
    // State for Selection
    const [selectedIds, setSelectedIds] = useState([]);

    // State for "More" dropdown visibility
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    // --- DATA (Note: I made IDs unique to prevent selection bugs across folders) ---
    const inboxMessageContent = [
        { id: 1, sender: "Clifford Torion", subject: "Meeting Reminder", snippet: "Don't forget about our meeting...", time: "9:30 AM" },
        { id: 2, sender: "Marc Justin Jadaone", subject: "Project Update", snippet: "The latest update on the project...", time: "Yesterday" },
        { id: 3, sender: "Alex Dipinili", subject: "Policy Changes", snippet: "Please be informed about the recent changes...", time: "2 days ago" }
    ];

    const sentMessageContent = [
        { id: 4, sender: "Clifford Torion", subject: "Sent", snippet: "Sent Sample Message", time: "9:30 AM" },
        { id: 5, sender: "Marc Justin Jadaone", subject: "Sent", snippet: "Sent Sample Message", time: "Yesterday" },
        { id: 6, sender: "Alex Dipinili", subject: "Sent", snippet: "Sent Sample Message", time: "2 days ago" }
    ];
    
    const draftMessageContent = [
        { id: 7, sender: "Clifford Torion", subject: "Draft", snippet: "Draft Sample Message", time: "9:30 AM" },
        { id: 8, sender: "Marc Justin Jadaone", subject: "Draft", snippet: "Draft Sample Message", time: "Yesterday" },
        { id: 9, sender: "Alex Dipinili", subject: "Draft", snippet: "Draft Sample Message", time: "2 days ago" }
    ];

    const trashMessageContent = [
        { id: 10, sender: "Clifford Torion", subject: "Deleted", snippet: "Deleted Sample Message", time: "9:30 AM" },
    ];

    // --- HELPER: Get the current array based on the dropdown ---
    const getCurrentList = () => {
        switch (messageContentPage) {
            case 'Inbox': return inboxMessageContent;
            case 'Sent': return sentMessageContent;
            case 'Draft': return draftMessageContent;
            case 'Trash': return trashMessageContent;
            default: return inboxMessageContent;
        }
    };

    // --- EVENT HANDLERS ---

    const handleSelectChange = (event) => {
        setMessageContentPage(event.target.value);
        setSelectedIds([]); // Clear selection when changing folders
        setShowMoreOptions(false); // Close 'more' menu if open
    };

    const handleMessageClick = (message) => {
        setSelectedMessage(message); 
        setShowMessageContent(true); 
    };

    // 1. SELECT ALL LOGIC
    const handleSelectAll = () => {
        const currentList = getCurrentList();
        
        // If everything currently visible is selected, deselect all
        // We check if every ID in the current list is already in the selectedIds array
        const allSelected = currentList.every(msg => selectedIds.includes(msg.id));

        if (allSelected) {
            // Remove current list items from selection (keep items from other folders if any)
            const currentIds = currentList.map(msg => msg.id);
            setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)));
        } else {
            // Add all current list IDs to selection
            const currentIds = currentList.map(msg => msg.id);
            // Combine unique IDs
            setSelectedIds(prev => [...new Set([...prev, ...currentIds])]);
        }
    };

    // 2. INDIVIDUAL SELECT LOGIC
    const toggleSelectMessage = (e, id) => {
        e.stopPropagation(); // Stop the row click event
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(item => item !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    // 3. REFRESH LOGIC
    const handleRefresh = () => {
        // Since data is hardcoded, we will just simulate a visual refresh
        setSelectedIds([]); // Clear selections
        // alert("Refreshed!"); // Optional: Feedback
    };

    // 4. MORE BUTTON LOGIC
    const toggleMoreOptions = () => {
        setShowMoreOptions(!showMoreOptions);
    };
    
    const handleMarkAsRead = () => {
        console.log("Marking as read:", selectedIds);
        setShowMoreOptions(false);
    };

    return (
        <div className="message-page" onClick={() => setShowMoreOptions(false)}>
            <div className='main-header'>
                <h2>{messageContentPage}</h2>
                <button className='compose-button' onClick={() => setComposeMessageVisible(true)}>
                    <img src={compose} alt="compose"/>
                    Compose
                </button>
            </div>

            <div className='sub-header'>
                <div className='sub-header-options'>
                    {/* Select All Button */}
                    <img 
                        src={select} 
                        alt="select all" 
                        role='button' 
                        onClick={handleSelectAll}
                        style={{ cursor: 'pointer', opacity: selectedIds.length > 0 ? 1 : 0.6 }}
                    />
                    
                    {/* Refresh Button */}
                    <img 
                        src={refresh} 
                        alt="refresh" 
                        role='button' 
                        onClick={handleRefresh}
                        style={{ cursor: 'pointer' }}
                    />    
                    
                    {/* More Button */}
                    <div style={{ position: 'relative' }}>
                        <img 
                            src={more} 
                            alt="more" 
                            role='button' 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMoreOptions();
                            }}
                            style={{ cursor: 'pointer' }}
                        />
                        {/* Simple "More" Dropdown */}
                        {showMoreOptions && (
                            <div className="more-options-dropdown" style={{
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                background: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                padding: '5px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                zIndex: 10,
                                width: '120px'
                            }}>
                                <div onClick={handleMarkAsRead} style={{ padding: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#555' }}>Mark as Read</div>
                                <div style={{ padding: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#555' }}>Delete</div>
                            </div>
                        )}
                    </div>
                </div>

                <select className='inbox-select' value={messageContentPage} onChange={handleSelectChange}>
                    <option value="Inbox">Inbox</option>
                    <option value="Sent">Sent</option>
                    <option value="Draft">Draft</option>
                    <option value="Trash">Trash</option>
                </select>
            </div>

            {/* REFACTORED LIST RENDERING */}
            <div className='message-list'>
                {getCurrentList().map((message) => {
                    const isSelected = selectedIds.includes(message.id);
                    return (
                        <div 
                            key={message.id} 
                            className={`message-item ${isSelected ? 'selected' : ''}`}
                            role='button' 
                            onClick={() => handleMessageClick(message)}
                            style={{ backgroundColor: isSelected ? 'var(--white-bg-color)' : '' }} // Optional override
                        >
                            <input 
                                type="checkbox" 
                                className='message-checkbox' 
                                checked={isSelected}
                                onChange={(e) => toggleSelectMessage(e, message.id)}
                                onClick={(e) => e.stopPropagation()} // Extra safety
                            />
                            <div className='message-details'>
                                <h3 className='message-sender'>{message.sender}</h3>
                                <h4 className='message-subject'>{message.subject}</h4>
                                <p className='message-snippet'>{message.snippet}</p>
                            </div>
                            <p className='message-time'>{message.time}</p>
                        </div>
                    );
                })}
            </div>

            {/* COMPOSE MODAL */}
            {composeMessageVisible && (
                <div className='compose-message-modal'>
                    <div className='compose-message-content'>
                        <div>
                            <h2>New Message</h2>
                            <button onClick={() => setComposeMessageVisible(false)}>Close</button>
                        </div>
                        <form>
                            <input type="text" placeholder="To:" className='compose-input'/>
                            <input type="text" placeholder="Subject:" className='compose-input'/>
                            <textarea placeholder="Type your message here..." className='compose-textarea'></textarea>
                            <button type="submit" className='send-button'>Send</button>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW MESSAGE MODAL */}
            {showMessageContent && selectedMessage && (
                <div className='message-content-modal'>
                    <div className='message-content'>
                        <div className='msg-header'>
                            <h2>{selectedMessage.subject}</h2>
                            <button className='close-icon-btn' onClick={() => setShowMessageContent(false)}>✕</button>
                        </div>
                        <div className='msg-meta'>
                            <div className='msg-sender-details'>
                                <span className='sender-name'>{selectedMessage.sender}</span>
                                <span className='sender-email'>&lt;{selectedMessage.sender.toLowerCase().replace(/\s/g, '')}@example.com&gt;</span>
                            </div>
                            <span className='msg-time'>{selectedMessage.time}</span>
                        </div>
                        <div className='msg-body'>
                            <p>{selectedMessage.snippet}</p>
                        </div>
                        <div className='msg-footer'>
                            <button className='reply-button'>Reply</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Message;