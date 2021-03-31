import './style.css';
import { useEffect, useState } from 'react';
import swapiPerson from '../../helpers/swapiPerson';
import NavBar from '../NavBar';
import Details from '../Details';


const App = () => {
  const [swapiResponse, setSwapiResponse] = useState<swapiPerson[]>([]);
  const [page, setPage]= useState<string|null>("https://swapi.dev/api/people/?page=1");
  const [currentlySelected, setCurrentlySelected] = useState<swapiPerson|null>(null)


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

  useEffect(()=> {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="main_container">
    <NavBar People={swapiResponse} Click={fetchData} SetSelected={setCurrentlySelected}/>
    {currentlySelected != null && <Details Person={currentlySelected}/>}
    </div>
  );
}

const changeToHttps = (uri: string):string => {
  return 'https'+uri.slice(4);
}

export default App;
