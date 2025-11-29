import React, { useState } from 'react';
import "../../css/message/message.css";

// Message Assets
import select from "../../assets/message/selectAll.svg";
import refresh from "../../assets/message/refresh.svg";
import more from "../../assets/message/moreButton.svg";
import compose from "../../assets/message/compose.svg";   

function Message() {
    const [messageContentPage, setMessageContentPage] = useState('Inbox');
    const [composeMessageVisible, setComposeMessageVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showMessageContent, setShowMessageContent] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showMoreOptions, setShowMoreOptions] = useState(false);

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


    const getCurrentList = () => {
        switch (messageContentPage) {
            case 'Inbox': return inboxMessageContent;
            case 'Sent': return sentMessageContent;
            case 'Draft': return draftMessageContent;
            case 'Trash': return trashMessageContent;
            default: return inboxMessageContent;
        }
    };


    const handleSelectChange = (event) => {
        setMessageContentPage(event.target.value);
        setSelectedIds([]); 
        setShowMoreOptions(false); 
    };

    const handleMessageClick = (message) => {
        setSelectedMessage(message); 
        setShowMessageContent(true); 
    };


    const handleSelectAll = () => {
        const currentList = getCurrentList();
        const allSelected = currentList.every(msg => selectedIds.includes(msg.id));

        if (allSelected) {
            const currentIds = currentList.map(msg => msg.id);
            setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)));
        } else {
            const currentIds = currentList.map(msg => msg.id);
            setSelectedIds(prev => [...new Set([...prev, ...currentIds])]);
        }
    };

    const toggleSelectMessage = (e, id) => {
        e.stopPropagation(); 
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(item => item !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const handleRefresh = () => {
        setSelectedIds([]);
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
                    <img 
                        src={select} 
                        alt="select all" 
                        role='button' 
                        onClick={handleSelectAll}
                        title="Select All"
                    />
                    
                    <img 
                        src={refresh} 
                        alt="refresh" 
                        role='button' 
                        onClick={handleRefresh}
                        title="Refresh"
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
                        />
                        {/* Simple "More" Dropdown */}
                        {showMoreOptions && (
                            <div className="more-options-dropdown">
                                <div className="dropdown-item" onClick={handleMarkAsRead}>Mark as Read</div>
                                <div className="dropdown-item">Delete</div>
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