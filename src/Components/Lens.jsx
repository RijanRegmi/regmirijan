import React, { useRef, useState } from 'react';
import './../Style/Lens.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Lens() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [capturedImg, setCapturedImg] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const flashEffect = () => {
    if (!flashOn) return;
    const flashDiv = document.createElement('div');
    flashDiv.style.position = 'fixed';
    flashDiv.style.top = '0';
    flashDiv.style.left = '0';
    flashDiv.style.width = '100vw';
    flashDiv.style.height = '100vh';
    flashDiv.style.backgroundColor = 'white';
    flashDiv.style.opacity = '0.8';
    flashDiv.style.zIndex = '9999';
    document.body.appendChild(flashDiv);
    setTimeout(() => {
      document.body.removeChild(flashDiv);
    }, 150);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/png');
    setCapturedImg(imageDataURL);
    flashEffect();
  };

  const handleCaptureWithTimer = () => {
    if (timer === 0) {
      capturePhoto();
      return;
    }

    let count = timer;
    setCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();
      }
    }, 1000);
  };

  const triggerUpload = () => {
    fileInputRef.current.value = ""; // ✅ Reset before opening file dialog
    fileInputRef.current.click();
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImg(reader.result);
      fileInputRef.current.value = ""; // ✅ Reset file input so same file works again
    };
    reader.readAsDataURL(file);
  };


  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = capturedImg;
    a.download = 'captured-image.png';
    a.click();
  };

  return (
    <>
      <Header />
      <div className="lens-container">
        <div className="frame">
          <h2 className="title">Take or upload picture</h2>
          <p className="subtext">We'll show you how it looks on you using AI!</p>

          <div className="camera-box">
            <video ref={videoRef} autoPlay className="video-feed" />

            {/* Flash Toggle Button */}
            <button
              className={`icon-btn flash-btn ${flashOn ? 'active' : ''}`}
              onClick={() => setFlashOn(!flashOn)}
              title="Toggle Flash"
            >
              ⚡
            </button>

            {/* Timer Dropdown */}
            <div className="timer-dropdown">
              <button className="icon-btn timer-btn" title="Timer">
                ⏱
              </button>
              <div className="timer-options">
                {[0, 3, 5, 10].map((val) => (
                  <div
                    key={val}
                    className={`timer-option ${timer === val ? 'selected' : ''}`}
                    onClick={() => setTimer(val)}
                  >
                    {val === 0 ? 'Off' : `${val}s`}
                  </div>
                ))}
              </div>
            </div>

            {/* Capture Button */}
            <button onClick={handleCaptureWithTimer} className="capture-btn"></button>

            {/* Countdown */}
            {countdown !== null && <div className="countdown-overlay">{countdown}</div>}
          </div>

          <div className="button-group">
            <button className="upload-btn" onClick={triggerUpload}>Upload</button>
            <button onClick={startCamera} className="upload-btn">Start Camera</button>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="file-input-hidden"
          />

          <canvas ref={canvasRef} width="675" height="500" hidden />
        </div>

        <div className="frame">
          <h2 className="title">Your recommended output</h2>
          <div className="output-box">
            {capturedImg && <img src={capturedImg} alt="Captured" className="captured-img" />}
          </div>

          <button className="action-btn" onClick={() => setShowPreview(true)}>Preview</button>
          <button className="action-btn" onClick={handleDownload}>Download</button>

          <h3 className="subtext">Try These styles</h3>
          <div className="filters">
            {[...Array(7)].map((_, idx) => (
              <div
                key={idx}
                className={`filter-circle ${selectedFilter === idx ? 'selected-filter' : ''}`}
                onClick={() => setSelectedFilter(idx)}
              ></div>
            ))}
          </div>
        </div>

        {showPreview && (
          <div className="preview-popup">
            <div className="popup-content">
              <button className="close-btn" onClick={() => setShowPreview(false)}>✕</button>
              <img src={capturedImg} alt="Preview" className="popup-img" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Lens;
