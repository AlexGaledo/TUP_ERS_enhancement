// TUP_ERS_enhancement\ers_frontend

import React, { useState } from 'react';
import "../../css/message/message.css";

// Message Assets
import select from "../../assets/message/selectAll.svg";
import selectMessage from "../../assets/message/selectmessage.svg"; 
import dropdown from "../../assets/message/dropdown.svg";
import line from "../../assets/message/line.svg";
import check from "../../assets/message/check.svg";
import refresh from "../../assets/message/refresh.svg";
import more from "../../assets/message/moreButton.svg";
import compose from "../../assets/message/compose.svg";   
import inboxdropdown from "../../assets/message/inbox-dropdown.svg";

function Message() {
    const [messageContentPage, setMessageContentPage] = useState('Inbox');
    const [composeMessageVisible, setComposeMessageVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showMessageContent, setShowMessageContent] = useState(false);

  const inboxMessageContent = [
    {
        id: 1,
        sender: "Clifford Torion",
        subject: "Meeting Reminder",
        snippet: "Don't forget about our meeting scheduled for tomorrow at 10 AM.",
        time: "9:30 AM"
    },
    {
        id: 2,
        sender: "Marc Justin Jadaone",
        subject: "Project Update",
        snippet: "The latest update on the project is attached. Please review it before our next discussion.",
        time: "Yesterday"
    },
    {
        id: 3,
        sender: "Alex Dipinili",
        subject: "Policy Changes",
        snippet: "Please be informed about the recent changes in school policies. Check the attached document for details.",
        time: "2 days ago"
    }
  ]

  const sentMessageContent = [
    {
        id: 1,
        sender: "Clifford Torion",
        subject: "Sent",
        snippet: "Sent Sample Message",
        time: "9:30 AM"
    },
    {
        id: 2,
        sender: "Marc Justin Jadaone",
        subject: "Sent",
        snippet: "Sent Sample Message",
        time: "Yesterday"
    },
    {
        id: 3,
        sender: "Alex Dipinili",
        subject: "Sent",
        snippet: "Sent Sample Message",
        time: "2 days ago"
    }
  ]
  
  const draftMessageContent = [
    {
        id: 1,
        sender: "Clifford Torion",
        subject: "Draft",
        snippet: "Draft Sample Message",
        time: "9:30 AM"
    },
    {
        id: 2,
        sender: "Marc Justin Jadaone",
        subject: "Draft",
        snippet: "Draft Sample Message",
        time: "Yesterday"
    },
    {
        id: 3,
        sender: "Alex Dipinili",
        subject: "Draft",
        snippet: "Draft Sample Message",
        time: "2 days ago"
    }
  ]

  const trashMessageContent = [
    {
        id: 1,
        sender: "Clifford Torion",
        subject: "Draft",
        snippet: "Draft Sample Message",
        time: "9:30 AM"
    },
  ]

  function handleSelectChange(event) {
    setMessageContentPage(event.target.value);
  }

  const handleMessageClick = (message) => {
    setSelectedMessage(message); 
    setShowMessageContent(true); 
  };

  return (
    <div className="message-page">
        <div className='main-header'>
            {messageContentPage === 'Inbox' ? (
                <h2>Inbox</h2>): messageContentPage === 'Sent' ? (
                <h2>Sent</h2>) : messageContentPage === 'Draft' ? (
                <h2>Draft</h2>) : (
                <h2>Trash</h2>
            )}

            <button className='compose-button' onClick={() => setComposeMessageVisible(true)}>
                <img src={compose} alt="compose"/>
                Compose
            </button>
        </div>

        <div className='sub-header'>
            <div className='sub-header-options'>
                <img src={select} alt="select all" role='button'/>
                <img src={refresh} alt="refresh" role='button'/>    
                <img src={more} alt="more" role='button'/>
            </div>
            <select className='inbox-select' defaultValue={'Inbox'} onChange={handleSelectChange}>
                <option>Inbox</option>
                <option>Sent</option>
                <option>Draft</option>
                <option>Trash</option>
            </select>
        </div>

        <div className='message-list'>
            {messageContentPage === 'Inbox' ? (inboxMessageContent.map((message) => (
                        <div key={message.id} className="message-item" role='button' onClick={() => handleMessageClick(message)}>
                        <input type="checkbox" className='message-checkbox'/>
                        <div className='message-details'>
                            <h3 className='message-sender'>{message.sender}</h3>
                            <h4 className='message-subject'>{message.subject}</h4>
                            <p className='message-snippet'>{message.snippet}</p>
                        </div>
                        <p className='message-time'>{message.time}</p>
                    </div>
                ))) : messageContentPage === 'Sent' ? (sentMessageContent.map((message) => (
                    <div key={message.id} className="message-item" role='button' onClick={() => setShowMessageContent(true)}>
                        <input type="checkbox" className='message-checkbox'/>
                        <div className='message-details'>
                            <h3 className='message-sender'>{message.sender}</h3>
                            <h4 className='message-subject'>{message.subject}</h4>
                            <p className='message-snippet'>{message.snippet}</p>
                        </div>
                        <p className='message-time'>{message.time}</p>
                    </div>
                ))) : messageContentPage === 'Draft' ? (draftMessageContent.map((message) => (
                    <div key={message.id} className="message-item" role='button' onClick={() => setShowMessageContent(true)}>
                        <input type="checkbox" className='message-checkbox'/>
                        <div className='message-details'>
                            <h3 className='message-sender'>{message.sender}</h3>
                            <h4 className='message-subject'>{message.subject}</h4>
                            <p className='message-snippet'>{message.snippet}</p>
                        </div>
                        <p className='message-time'>{message.time}</p>
                    </div>
                ))) : (trashMessageContent.map((message) => (
                    <div key={message.id} className="message-item" role='button' onClick={() => setShowMessageContent(true)}>
                        <input type="checkbox" className='message-checkbox'/>
                        <div className='message-details'>
                            <h3 className='message-sender'>{message.sender}</h3>
                            <h4 className='message-subject'>{message.subject}</h4>
                            <p className='message-snippet'>{message.snippet}</p>
                        </div>
                        <p className='message-time'>{message.time}</p>
                    </div>
                )))
            }      
        </div>
        

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


        {showMessageContent && selectedMessage && (
            <div className='message-content-modal'>
                <div className='message-content'>
                    
                    {/* Header: Subject & Close */}
                    <div className='msg-header'>
                        <h2>{selectedMessage.subject}</h2>
                        <button className='close-icon-btn' onClick={() => setShowMessageContent(false)}>
                            ✕
                        </button>
                    </div>

                    {/* Meta Data: Sender & Time */}
                    <div className='msg-meta'>
                        <div className='msg-sender-details'>
                            <span className='sender-name'>{selectedMessage.sender}</span>
                            <span className='sender-email'>&lt;{selectedMessage.sender.toLowerCase().replace(' ', '')}@example.com&gt;</span>
                        </div>
                        <span className='msg-time'>{selectedMessage.time}</span>
                    </div>

                    {/* Message Body */}
                    <div className='msg-body'>
                        <p>{selectedMessage.snippet}</p>
                    </div>

                    {/* Footer: Action Buttons */}
                    <div className='msg-footer'>
                        <button className='reply-button'>
                            Reply
                        </button>
                    </div>

                </div>
            </div>
        )}


    </div>
  );
}

export default Message;