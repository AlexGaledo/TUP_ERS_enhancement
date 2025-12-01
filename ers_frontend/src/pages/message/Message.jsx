// TUP_ERS_enhancement\ers_frontend
import React, { useState, useRef } from 'react';
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
    const [isRead, setIsRead] = useState([]);
    const composeFormRef = useRef(null);

    const [trashMessages, setTrashMessages] = useState([
        { id: 10, sender: "Clifford Torion", subject: "Deleted", snippet: "Deleted Sample Message", time: "9:30 AM" },
    ]);

    const [inboxMessages, setInboxMessages] = useState([
        { id: 1, sender: "Clifford Torion", subject: "Meeting Reminder", snippet: "Don't forget about our meeting...", time: "2 days ago" },
        { id: 2, sender: "Marc Justin Jadaone", subject: "Project Update", snippet: "The latest update on the project...", time: "Yesterday" },
        { id: 3, sender: "Alex Difeenili", subject: "Policy Changes", snippet: "Please be informed about the recent changes...", time: "9:30 AM" }
    ]);

    const [sentMessages, setSentMessages] = useState([
        { id: 4, sender: "Clifford Torion", subject: "Sent", snippet: "Sent Sample Message", time: "2 days ago" },
        { id: 5, sender: "Marc Justin Jadaone", subject: "Sent", snippet: "Sent Sample Message", time: "Yesterday" },
        { id: 6, sender: "Alex Difeenili", subject: "Sent", snippet: "Sent Sample Message", time: "9:30 AM" }
    ]);
    
    const [draftMessages, setDraftMessages] = useState([
        { id: 7, sender: "Clifford Torion", subject: "Draft", snippet: "Draft Sample Message", time: "2 days ago" },
        { id: 8, sender: "Marc Justin Jadaone", subject: "Draft", snippet: "Draft Sample Message", time: "Yesterday" },
        { id: 9, sender: "Alex Difeenili", subject: "Draft", snippet: "Draft Sample Message", time: "9:30 AM" }
    ]);


    const getCurrentList = () => {
        switch (messageContentPage) {
            case 'Inbox': return inboxMessages;
            case 'Sent': return sentMessages;
            case 'Draft': return draftMessages;
            case 'Trash': return trashMessages;
            default: return inboxMessages;
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
        handleMarkAsRead(message.id); 
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

    
    const toggleMoreOptions = () => {
        setShowMoreOptions(!showMoreOptions);
    };
    
    const handleMarkAsRead = (messageId = null) => {
        setIsRead(prev => {
            const idsToMark = messageId ? [messageId] : selectedIds;
            const newReadMessages = [...new Set([...prev, ...idsToMark])];
            // console.log("Marking as read:", idsToMark);
            // console.log("Updated read messages:", newReadMessages);
            return newReadMessages;
        });
        
        if (!messageId) {
            setSelectedIds([]);
            setShowMoreOptions(false);
        }
    };

    const handleDelete = () => {
        if (messageContentPage === 'Trash') {
            // Permanently delete from trash
            setTrashMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));
        } else {
            // Move to trash from other folders
            const currentList = getCurrentList();
            const messagesToTrash = currentList.filter(msg => selectedIds.includes(msg.id));
            
            // Add to trash
            setTrashMessages(prev => [...prev, ...messagesToTrash]);
            
            // Remove from current folder
            switch (messageContentPage) {
                case 'Inbox':
                    setInboxMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));
                    break;
                case 'Sent':
                    setSentMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));
                    break;
                case 'Draft':
                    setDraftMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));
                    break;
            }
        }
        
        setSelectedIds([]); 
        setShowMoreOptions(false);
    }

    
    const handleSendMessage = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const recipient = formData.get('recipient');
        const subject = formData.get('subject');
        const messageBody = formData.get('message');
        
        const newMessage = {
            id: Date.now(), 
            sender: "You",
            subject: subject || "(No Subject)",
            snippet: messageBody || "",
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        
        setSentMessages(prev => [...prev, newMessage]);
        setComposeMessageVisible(false);
        e.target.reset();
    }

    const handleReply = () => {
        if (selectedMessage) {
            setComposeMessageVisible(true);
            setShowMessageContent(false);
        }
    };

    const handleDraftSave = () => {
        if (!composeFormRef.current) {
            setComposeMessageVisible(false);
            return;
        }
        
        const formData = new FormData(composeFormRef.current);
        const recipient = formData.get('recipient');
        const subject = formData.get('subject');
        const messageBody = formData.get('message');
        
        if (!recipient && !subject && !messageBody) {
            setComposeMessageVisible(false);
            return;
        }
        
        const newDraft = {
            id: Date.now(),
            sender: "You",
            subject: subject || "(No Subject)",
            snippet: messageBody || "",
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        
        setDraftMessages(prev => [...prev, newDraft]);
        setComposeMessageVisible(false);
        composeFormRef.current.reset();
    }

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
                        
                        {showMoreOptions && (
                            <div className="more-options-dropdown">
                                <div className="dropdown-item" onClick={() => handleMarkAsRead()}>Mark as Read</div>
                                <div className="dropdown-item" onClick={handleDelete}>Delete</div>
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


            <div className='message-list'>
                {getCurrentList()
                    .sort((a, b) => b.id - a.id)
                    .map((message) => {
                    const isSelected = selectedIds.includes(message.id);
                    const isMessageRead = isRead.includes(message.id);
                    return (
                        <div 
                            key={message.id} 
                            className={`message-item ${isSelected ? 'selected' : ''} ${isMessageRead ? 'read' : 'unread'}`}
                            role='button' 
                            onClick={() => handleMessageClick(message)}
                        >
                            <input 
                                type="checkbox" 
                                className='message-checkbox' 
                                checked={isSelected}
                                onChange={(e) => toggleSelectMessage(e, message.id)}
                                onClick={(e) => e.stopPropagation()}
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

            {/* COMPOSE/REPLY MODAL */}
            {composeMessageVisible && (
                <div className='compose-message-modal'>
                    <div className='compose-message-content'>
                        <div>
                            <h2>{selectedMessage ? `Reply to ${selectedMessage.sender}` : 'New Message'}</h2>
                            <button onClick={handleDraftSave}>Close</button>
                        </div>
                        <form ref={composeFormRef} onSubmit={handleSendMessage}>
                            <input 
                                type="text" 
                                name="recipient" 
                                placeholder="To:" 
                                defaultValue={selectedMessage?.sender || ''}
                                readOnly={!!selectedMessage}
                                className='compose-input' 
                                required
                            />
                            <input 
                                type="text" 
                                name="subject" 
                                placeholder="Subject:" 
                                defaultValue={selectedMessage ? `Re: ${selectedMessage.subject}` : ''}
                                readOnly={!!selectedMessage}
                                className='compose-input'
                            />
                            <textarea 
                                name="message" 
                                placeholder="Type your message here..." 
                                className='compose-textarea' 
                                required
                            ></textarea>
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
                        {(messageContentPage === 'Inbox' || messageContentPage === 'Sent') && (
                            <div className='msg-footer'>
                                <button className='reply-button' onClick={handleReply}>Reply</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default Message;