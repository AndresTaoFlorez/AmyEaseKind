import React, { useState, useEffect } from 'react';

function GetSerialNumber() {
  const [serial, setSerial] = useState({serialNumber: "", hostname:""});

  const handleClickSerial = async () => {
    const sn = await window.electron.getSerialNumber();
    console.log('asd');
    setSerial({
      serialNumber: sn.serialNumber,
      hostname: sn.hostname
    });
  };

  return (
    <div>
      <button onClick={handleClickSerial}>Enviar datos</button>
      <div>
        <h2>Datos</h2>
        <ul>
          <li>{serial.hostname}</li>
          <li>{serial.serialNumber}</li>
        </ul>
      </div>
    </div>
  );
}

export default GetSerialNumber;
