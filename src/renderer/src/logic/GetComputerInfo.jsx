import { useState, useEffect } from 'react';
import BasicButtons from '../components/Button';
import WordIcon from '../components/WordIcon';
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
    // Enviar los datos al backend con axios (uso de FormData para enviar archivos)
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


  // Borrar todos los archivos cargados en el front
  const erase = () => {
    setFiles([])
  }

  // Borrar un solo archivo cargado en el front
  const deleteFile = (e) => {
    const position = e.target.id
    console.log(`Position before: ${position}`);
    const newArray = files.filter((file, index) => index != position ?? file)
    setFiles(newArray)
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
        <input type='file' name='files' multiple onChange={handleFileChange} accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
        <div className='filesButtons'>
          <button onClick={uploadFile}>Upload</button>
          <button onClick={erase}>Erase All</button>
        </div>
        <div className="list">
          {files.length ? files.map((element, i) => {
            return (
              <ul className='elementList' key={i}>
                <div className="number"><li>{i + 1} </li></div>
                <div className="element">
                  <div className='elementTitleList'>
                    <h1>{element.name}</h1>
                    {/* <img src={URL.createObjectURL(element)} alt='file'></img> */}
                    <WordIcon></WordIcon>
                  </div>
                  <p>{element.lastModifiedDate.toString()}</p>
                  <button onClick={deleteFile} id={i}>Less</button>
                </div>
              </ul>
            )
          }) : <div className='noData'><h1>No Data</h1></div>}
        </div>
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
