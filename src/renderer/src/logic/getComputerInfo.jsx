import React, { useState, useEffect } from 'react';

function GetSerialNumber() {
   const [serial, setSerial] = useState('');

  const handleClickSerial = async () => {
    const a = await window.electron.serialNumber();
    setSerial(a);
  }

  useEffect(() => {
    handleClickSerial();
  }, []);

  return (
    <div>
      <button onClick={handleClickSerial}>Enviar datos</button>
      <div>Data: {serial}</div>
      <h1>Data from React</h1>
    </div>
  );
}

export default GetSerialNumber;
