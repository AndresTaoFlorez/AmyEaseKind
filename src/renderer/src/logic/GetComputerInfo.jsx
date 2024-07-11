import { useState, useEffect } from 'react';
import BasicButtons from '../components/Button';
import '../assets/style/GetComputerInfo.scss'

//React extern Component
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function GetComputerInfo() {
   const [computerInfo, setComputerInfo] = useState({
      serialNumber: '',
      hostname: '',
      manufacturerModel: ''
   });

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
            <div className="form">
               <div className='formElement'> {/*placa*/}
                  <label htmlFor="placa">Placa</label>
                  <input
                     type='text'
                     placeholder='Placa'
                     name='placa'>
                  </input>
               </div>
               <div className="formElement"> {/*serialNumber*/}
                  <label htmlFor="serialNumber">Serial</label>
                  <input
                     type="text"
                     placeholder='Serial Number'
                     value={computerInfo.serialNumber}
                     name='serialNumber' />
               </div>
               <div className="formElement"> {/*serialNumber*/}
                  <label htmlFor="hostname">Serial</label>
                  <input
                     type="text"
                     placeholder='hostname'
                     value={computerInfo.hostname}
                     name='serialNumber' />
               </div>
               <div className="formElement"> {/*serialNumber*/}
                  <label htmlFor="manufacturerModel">manufacturerModel</label>
                  <input
                     type="text"
                     placeholder='manufacturerModel'
                     value={computerInfo.manufacturerModel}
                     name='manufacturerModel' />
               </div>

            </div>
            <Stack onClick={handleClickSerial}
               spacing={2} direction='row'>
               {/* <Button variant='text'>Text</Button> */}
               <Button variant='contained'>Get data</Button>
               {/* <Button variant='outlined'>Outlined</Button> */}
            </Stack>
         </div>
      </div>
   );
}

export default GetComputerInfo;
