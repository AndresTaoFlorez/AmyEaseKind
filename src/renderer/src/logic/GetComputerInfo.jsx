import { useState, useEffect } from 'react';
import BasicButtons from '../components/Button';
import axios from 'axios';
import '../assets/style/GetComputerInfo.scss'

//React extern Component
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getTextFieldUtilityClass } from '@mui/material';


function GetComputerInfo() {
  const [data, setData] = useState({});
  const [error, setError] = useState({})

  const [files, setFiles] = useState([])
  const [computerInfo, setComputerInfo] = useState({
    serialNumber: '',
    hostname: '',
    manufacturerModel: ''
  });

  useEffect(() => {
    handleClickSerial()
  }, [])

  useEffect(() => {
    console.log(`< ${files.length} elementos en files >`)
  }, [files])

  const handleClickData = async () => {
    await fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => {
        setData({ 'message': data.message })
        setError(false)
        console.log(data.message)
      })
      .catch(setError(true))
  };


  const chandleChange = (e) => {
    console.log(e.target.value)
  }

  const showFiles = () => {
    console.log(files);
  }


  const handleClickSerial = async () => {
    const sn = await window.electron.getComputerInfo();
    setComputerInfo({
      serialNumber: sn.serialNumber,
      hostname: sn.hostname,
      manufacturerModel: sn.manufacturerModel,
    });
  };


  // enviar dato - SUBMIT
  const uploadFile = () => {

    const formData = new FormData();

    // agregar cada archivo en el FormData para enviarlo en el post (uso del forEach)
    files.forEach((file) => {
      formData.append('file', file);
    })

    axios.post('http://localhost:3001/cases',
      formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(Object.values(response.data).toString());
    }).catch(error => {
      console.log(error);
    });
  }

  // Cargar archivos al subir en el input
  const handleFileChange = (e) => {
    // convertir archivos en array para poder mapear 
    const newArray = Array.from(e.target.files).map(file => {
      return file
    })
    // tomar el resultado anterior y agregarle el actual
    // uso del operador de propagacion ( ...array) 
    setFiles([...files, ...newArray]);
  }

  return (
    <div className='getComputerInfo'>
      <section className='test'>
        <input type='file' name='files' multiple onChange={handleFileChange} />
        <div className="list">
          {files.length ? files.map((element, i) => {
            return (
              <ul className='elementList' key={i}>
                <div className="number"><li>{i + 1} </li></div>
                <div className="element">
                  <div className='elementTitleList'>
                    <h1>{element.name}</h1>
                    <img src={URL.createObjectURL(element)} alt='file'></img>
                  </div>
                  <p>{element.lastModifiedDate.toString()}</p>
                </div>
              </ul>
            )
          }) : <div className='noData'><h1>No Data</h1></div>}
        </div>
        <button onClick={uploadFile}>Upload</button>
        <button onClick={showFiles}>Show files</button>
        <button onClick={handleClickData}>Get data</button>
        <div className='list'>
          Data: {error ? 'No data' : data.message}
        </div>

      </section>
    </div>
  )
}

export default GetComputerInfo;
