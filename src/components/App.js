import React, { useState, useEffect } from 'react';

function App() {
  const [initialTime, setInitialTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  // Function to start the countdown timer
  const startTimer = () => {
    if (initialTime > 0) {
      setCurrentTime(Math.floor(initialTime));
      setTimerId(
        setInterval(() => {
          setCurrentTime((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(timerId);
              return 0;
            }
          });
        }, 1000)
      );
    }
  };

  // Event handler for the input field
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      const inputTime = parseFloat(e.target.value);
      const roundedTime = Math.floor(inputTime);
      setInitialTime(roundedTime);
      clearInterval(timerId); // Clear any previous timers
      startTimer();
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerId); // Clear the timer when the component unmounts
    };
  }, [timerId]);

  return (
    <div>
      <input
        type="text"
        id="timeCount"
        onKeyPress={handleInputKeyPress}
        placeholder="Enter time (integer)"
      />
      <div id="current-time">{currentTime}</div>
    </div>
  );
}

export default App;
