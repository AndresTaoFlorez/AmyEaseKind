import { useState, useEffect } from 'react';
import BasicButtons from '../components/Button';
import '../assets/style/GetComputerInfo.scss'

//React extern Component
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function GetComputerInfo() {
  const [data, setData] = useState([]);
  const [computerInfo, setComputerInfo] = useState({
    serialNumber: '',
    hostname: '',
    manufacturerModel: ''
  });

  useEffect(() => {
    handleClickSerial()
  }, [])
  
  const handleClickData = () => {
    fetch('http://localhost:3000/cases')
    .then(response => {
     const data = response.json()
     setData({data})
     console.log(data)
    })
  }
  
  const chandleChange = (e) => {
    // setComputerInfo({...data, "hostname": handleClickData})
    console.log(e.target.value)
  }
  
  const handleClickSerial = async () => {
    const sn = await window.electron.getComputerInfo();
    setComputerInfo({
      serialNumber: sn.serialNumber,
      hostname: sn.hostname,
      manufacturerModel: sn.manufacturerModel,
    });
    
  };


  return (
    <div className='getComputerInfo'>
      <div>
        <h2>Datos</h2>
        <form className="form">
          <div className='formElement'> {/*placa*/}
            <label htmlFor="placa">Placa</label>
            <input
              type='text'
              placeholder='Placa'
              name='placa'
              >
            </input>
          </div>
          <div className="formElement"> {/*serialNumber*/}
            <label htmlFor="serialNumber">Serial</label>
            <input
              type="text"
              placeholder='Serial Number'
              defaultValue={computerInfo.serialNumber}
              name='serialNumber' />
          </div>
          <div className="formElement"> {/*serialNumber*/}
            <label htmlFor="hostname">Hostname</label>
            <input
              type="text"
              placeholder='hostname'
              defaultValue={computerInfo.hostname}
              name='serialNumber'
              onChange={chandleChange}
               />
              
          </div>
          <div className="formElement"> {/*serialNumber*/}
            <label htmlFor="manufacturerModel">manufacturerModel</label>
            <input
              type="text"
              placeholder='manufacturerModel'
              defaultValue={computerInfo.manufacturerModel}
              name='manufacturerModel' />
          </div>

        </form>
        <Stack onClick={handleClickSerial}
          spacing={2} direction='row'>
          {/* <Button variant='text'>Text</Button> */}
          <Button variant='contained'>Get data</Button>
          {/* <Button variant='outlined'>Outlined</Button> */}
        </Stack>
      </div>
      <section className='test'>
        <button onClick={handleClickData}>Get data</button>
        <div className='list'>
          Data: {data}
        </div>

      </section>
    </div>
  );
}

export default GetComputerInfo;
