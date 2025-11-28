// TUP_ERS_enhancement\ers_frontend

import React from 'react';
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

  const messageContent = [
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



  return (
    <div className="message-page">
        <div className='main-header'>
            <h2>Inbox</h2>
            <button className='compose-button'>
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
            <select className='inbox-select' defaultValue={'Inbox'}>
                <option>Inbox</option>
                <option>Sent</option>
                <option>Draft</option>
                <option>Trash</option>
            </select>
        </div>

        <div className='message-list'>
            {messageContent.map((message) => (
                <div key={message.id} className='message-item'>
                    <img className='selectBtn' src={selectMessage} alt="select message" role='button'/>
                    
                    <div className='message-sender'>{message.sender}</div>
                    
                    <div className='message-subject'>{message.subject}</div>
                    <div className='message-snippet'>{message.snippet}</div>
                    
                    <div className='message-time'>{message.time}</div>
                </div>
            ))  
            
            }
        </div>

    </div>
  );
}

export default Message;