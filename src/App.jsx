import React, { useState } from 'react';
import "./App.css";
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something...!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    const genAI = new GoogleGenerativeAI("AIzaSyDzPcs3pYP0tPAPoXdMTn0TRDOZHsqHh0k");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];

    setMessages(newMessages); // Append new messages to the existing ones
    setisResponseScreen(true);
    setMessage(""); // Clear the input field after sending the message
    console.log(result.response.text());
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]); // Clear the messages array
  };

  return (
    <div className="container w-screen min-h-screen overflow-x-hidden bg-[#587ed0] text-white">
      {isResponseScreen ? (
        <>
          <div className="header flex items-center justify-start ">
            <h2 className="text-2xl flex-shrink-0">Dem Aid Assist Me</h2>
            <div className="flex justify-end flex-grow">
              <button
                id="newChatBtn"
                className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] "
                onClick={newChat}
              >
                New Chat
              </button>
            </div>
          </div>
          <div className="messages">
            {messages?.map((msg, index) => (
              <div key={index} className={msg.type}>{msg.text}</div>
            ))}
          </div>
        </>
      ) : (
        <div className="middle h-[80vh] flex items-center flex-col justify-center">
          <h1 className="text-4xl text-orange-500">Med Aid AssistMe</h1>
          <div className="boxes mt-[30px] flex items-center gap-2">
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
              <p className="text-[18px]">
                What is coding? <br />
                How can we learn it?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <IoCodeSlash />
              </i>
            </div>

            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
              <p className="text-[18px]">
                Which is the red <br />
                planet of the solar <br />
                system?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <BiPlanet />
              </i>
            </div>

            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
              <p className="text-[18px]">
                In which year was Python <br />
                invented?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <FaPython />
              </i>
            </div>

            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
              <p className="text-[18px]">
                How can we use <br />
                AI for adoption?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <TbMessageChatbot />
              </i>
            </div>
          </div>
        </div>
      )}

      <div className="bottom w-[100%] flex flex-col items-center">
        <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
            placeholder="Write your message here..."
            id="messageBox"
          />
          {message && (
            <i
              className="text-green-500 text-[20px] mr-5 cursor-pointer"
              onClick={hitRequest}
            >
              <IoSend />
            </i>
          )}
        </div>
        <p className="text-[#ede7e7] text-[14px] my-4">
          AssistMe is developed by Group Parallel Universe. This AI uses the
          Gemini API to provide responses to any user.
        </p>
      </div>
    </div>
  );
};

export default App;
