import { useState, useEffect } from 'react';
import BasicButtons from '../components/Button';
import '../assets/style/GetComputerInfo.scss'

//React extern Component
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function GetComputerInfo() {
  const [serial, setSerial] = useState({ serialNumber: "", hostname: "" });

  const handleClickSerial = async () => {
    const sn = await window.electron.getComputerInfo();
    setSerial({
      serialNumber: sn.serialNumber,
      hostname: sn.hostname
    });
  };

  return (
    <div className='getComputerInfo'>
      <div>
        <h2>Datos</h2>
        <ul>
          <li>Serial: {serial.serialNumber}</li>
          <li>Hostname: {serial.hostname}</li>
        </ul>
        <Stack onClick={handleClickSerial}
          spacing={2} direction="row">
          {/* <Button variant="text">Text</Button> */}
          <Button variant="contained">Contained</Button>
          {/* <Button variant="outlined">Outlined</Button> */}
        </Stack>
      </div>
    </div>
  );
}

export default GetComputerInfo;
