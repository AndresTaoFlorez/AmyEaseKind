import '../assets/style/Search.scss'
import { useState } from 'react'
import axios from 'axios'


function Search() {

  const [search, setSearch] = useState('')
  const handleChangeSearch = (e) => {
    const searchValue = e.target.value
    setSearch(searchValue)
  }
  const sendQuery = () => {
    axios.post('http://localhost:3001/search', {search})
      .then((response)=>{
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log('Search button clicked: ' + search)
    // enviar consulta al BackEnd para que busque entre sus archivos

  }
  return (<>
    <div className="searchBar">
      <input type="text" name='searchButton' placeholder="Search..." onChange={handleChangeSearch} />
      <button className="searchButton" name='searchButton' onClick={sendQuery}>Search</button>
    </div>
  </>)
}

export default Search;