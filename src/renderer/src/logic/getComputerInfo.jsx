import React, { useEffect, useState } from 'react';
// import { ipcRenderer } from 'electron';
// En tu código de React
// En tu código de React


// function GetSerialNumber() {
//   useEffect(() => {
//     ipcRenderer.on('serialNumber', (event, data) => {
//       console.log(data); // Imprime el número de serie del equipo
//       console.log("Data........."); // Imprime el número de serie del equipo
//     });

//     // Asegúrate de eliminar el listener cuando el componente se desmonte
//     return () => {
//       ipcRenderer.removeAllListeners('serialNumber');
//     }
//   }, []);

//   return <div>Mi Componente</div>;
// }

function GetSerialNumber() {
   const [serial, setSerial] = useState('')

   useEffect(()=>{
      const serialNumber = window.electron.getComputerSerial()
      // const serialNumber = "serial"
      setSerial(serialNumber)
   }, [])
   return (<>
      <div className="mainContaint">
         <h2>Mi Componente</h2>
         <h2>Número de serie: {serial}</h2>
      </div>
   </>)
}

export default GetSerialNumber;
