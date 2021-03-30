import './style.css';
import { useEffect, useState } from 'react';
import swapiPerson from '../../helpers/swapiPerson';
import NavBar from '../NavBar';
import Details from '../Details';


const App = () => {
  const [swapiResponse, setSwapiResponse] = useState<swapiPerson[]>([]);
  const [page, setPage]= useState<number>(1);
  const [currentlySelected, setCurrentlySelected] = useState<swapiPerson|null>(null)

  const incrementPage = () => {
    setPage(page+1);
  }

  useEffect(()=> {
    fetch("https://swapi.dev/api/people/?page="+page)
    .then(res => res.json())
    .then(json => {
      const results = json.results;
      console.log(results);
      setSwapiResponse(prev => prev.concat(results));
    })
  },[page])

  return (
    <div className="main_container">
    <NavBar People={swapiResponse} Click={incrementPage} SetSelected={setCurrentlySelected}/>
    {currentlySelected != null && <Details Person={currentlySelected}/>}
    </div>
  );
}

export default App;
