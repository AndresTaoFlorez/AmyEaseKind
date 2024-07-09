import GetSerialNumber from "../logic/GetSerialNumber";

function Body (){
  return (<>
    <div className="headerBody">
      <h1>
        Main title of Header Body
        <GetSerialNumber></GetSerialNumber>
      </h1>
    </div>
  </>)
}

export default Body;