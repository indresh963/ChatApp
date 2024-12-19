import "./App.css";
import { useState } from "react";
import UrlPopUp from "./components/UrlPopUp";
import ChantInbox from "./components/ChantInbox";

function App() {
  const [Url, setUrl] = useState('')
  const [hasUrl, setHasUrl] = useState(false);
  return (
    <>
      <div className="container">
        {
          hasUrl ? <ChantInbox url={Url} /> : <UrlPopUp url={Url} setUrl={setUrl} setHasUrl={setHasUrl} />
        }
      </div>
    </>
  );
}

export default App;
