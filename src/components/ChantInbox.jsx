import { useState, useEffect, useRef } from "react";

const ChantInbox = ({url}) => {
  const [messages, setMessages] = useState([]); // State for received messages
  const [input, setInput] = useState(""); // State for the message input field
  const [sentMessages, setSentMessages] = useState([]);
  const ws = useRef(null); // Ref to store WebSocket instance

  useEffect(() => {
    // Initialize WebSocket connection when the component mounts
    ws.current = new WebSocket(`ws://${url}`); // Replace with your server URL

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      // On receiving a message, add it to the messages array
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  // Function to send the message to the WebSocket server
  const sendMessage = () => {
    if (sentMessages.length > 0) {
      setSentMessages((prev) => [...prev, input]);
      if (ws.current && input.trim()) {
        ws.current.send(input); // Send the message
        setInput(""); // Clear the input field
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="chant-inbox">
      {/* Display received messages */}
      <div className="message-box">
        <div className="sent-box">
          <h3>Sent Messages:</h3>

          <div className="sent-message-box">
            <ul>
              {sentMessages.map((msg, index) => (
                <li key={index}>
                  {msg}{" "}
                  <button
                    onClick={() => {
                      copyToClipboard(messages[index]);
                    }}
                    className="copy-btn"
                  >
                    copy
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="input-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <button id="sentMsg" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
        <div className="resizable"></div>
        <div className="received-box">
          <h3>Recieved Messages:</h3>
          <div className="recieved-message-box">
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  {msg}{" "}
                  <button
                    onClick={() => {
                      copyToClipboard(messages[index]);
                    }}
                    className="copy-btn"
                  >
                    copy
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Input box to send messages */}
    </div>
  );
};

export default ChantInbox;
