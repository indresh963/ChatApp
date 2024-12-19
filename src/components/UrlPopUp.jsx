const UrlPopUp = ({ url, setUrl, setHasUrl }) => {
  const handleGo = ()=> {
    if(url) setHasUrl(true);
  }
  return (
    <div className="popup-container">
      <div className="popup-box">
        <div className="popUp-header">
          <h3>Enter your URL</h3>
          <button onClick={handleGo} type="button">GO</button>
        </div>
        <input
          autoFocus
          id="urlInput"
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UrlPopUp;
