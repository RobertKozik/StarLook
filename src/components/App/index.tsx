import './style.css';
import { useEffect, useState } from 'react';
import swapiPerson from '../../helpers/swapiPerson';
import NavBar from '../NavBar';
import Details from '../Details';


const App = () => {
  const [swapiResponse, setSwapiResponse] = useState<swapiPerson[]>([]);
  const [filteredSwapiResponse, setFilteredSwapiResponse] = useState<swapiPerson[]>([]);
  const [page, setPage]= useState<string|null>("https://swapi.dev/api/people/?page=1");
  const [currentlySelected, setCurrentlySelected] = useState<swapiPerson|null>(null)
  const [nameFilter, setNameFilter] = useState<string>("");

  const filterResponse = () => {
    //if filter is empty filteredResponse is just a response
    if(nameFilter === '') return setFilteredSwapiResponse(swapiResponse);
    const filtered:swapiPerson[] = swapiResponse.filter(element => {
      //make filter case insensitive
      const allUpperName:string = element.name.toUpperCase();
      return allUpperName.includes(nameFilter.toUpperCase());
    })
    //if no matching records fetch Data until at least one is found;
    if(filtered.length === 0) return fetchData();
    console.log(filtered);
    setFilteredSwapiResponse(filtered);
  }
  
  const fetchData = () => {
    if(page === null) return;

    fetch(page)
    .then(res => res.json())
    .then(json => {
      const results = json.results;
      console.log(json);
      setSwapiResponse(prev => prev.concat(results));
      json.next==null?setPage(null):setPage(changeToHttps(json.next));
    })
  }


  useEffect(() => filterResponse(), 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [nameFilter, swapiResponse]);

  useEffect(()=> {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="main_container">
      <input type="text" onChange={(e) => setNameFilter(e.target.value)}></input>   
        <NavBar People={filteredSwapiResponse} Fetch={fetchData} SetSelected={setCurrentlySelected}/>
      {currentlySelected != null && <Details Person={currentlySelected}/>}
    </div>
  );
}

const changeToHttps = (uri: string):string => {
  return 'https'+uri.slice(4);
}

export default App;
