import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

function GetSerialNumber() {
  useEffect(() => {
    ipcRenderer.on('serial-number', (event, data) => {
      console.log(data); // Imprime el número de serie del equipo
    });

    // Asegúrate de eliminar el listener cuando el componente se desmonte
    return () => {
      ipcRenderer.removeAllListeners('serial-number');
    }
  }, []);

  return <div>Mi Componente</div>;
}

export default GetSerialNumber;
