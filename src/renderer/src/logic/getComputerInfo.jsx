import React, { useState } from 'react';

function GetSerialNumber() {
  const [serial, setSerial] = useState('data');
  const handleClickSerial = () => {
    const newSerial = window.electronData.getInfo()
    // const newSerial = "serial"
    setSerial(newSerial);
  }


  return (
    <div>
      <button onClick={handleClickSerial}>Enviar datos</button>
      <div>Data: {serial}</div>
    </div>
  );
}

export default GetSerialNumber;
