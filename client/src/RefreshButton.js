import React, { useState } from 'react';

function TimeAndFetchButton({onFetch}) {
  const [timeUntil, setTimeUntil] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch('/time-and-fetch');
      const { message } = await response.json();
      console.log(message);
      setTimeUntil(message);
      onFetch(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick}>
      Fetch and Get Time Until
    </button>
  );
}

export default TimeAndFetchButton;