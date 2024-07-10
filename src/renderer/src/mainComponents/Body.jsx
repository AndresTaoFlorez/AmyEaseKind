import '../assets/style/Body.scss'
import GetSerialNumber from "../logic/GetComputerInfo";

function Body() {
  return (<>
  <div className="Body">
    <div className="bodyHeader">
      <h1>
        Main title of Header Body
      </h1>
    </div>
      <div className="bodyContent">
        <GetSerialNumber></GetSerialNumber>
      </div>
  </div>
  </>)
}

export default Body;