## Componente de formulario:
```jsx
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
```