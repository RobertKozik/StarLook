import './style.css';
import {getSwapiPeople} from '../../helpers/FetchWrapper'
import { useEffect, useState } from 'react';
import swapiPerson from '../../helpers/swapiPerson';


const App = () => {
  const [swapiResponse, setSwapiResponse] = useState([]);
  const [page, setPage]= useState(1);

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
    <div className="App">
      {swapiResponse.map((el: swapiPerson) => {
        return (
          <h1>{el.name}</h1>
        )
      })}
      <button onClick={() => setPage(page+1)}>
        click me
      </button>
    </div>
  );
}

export default App;
