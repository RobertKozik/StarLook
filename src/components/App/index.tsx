import './style.css';
import { useEffect, useState } from 'react';
import swapiPerson from '../../helpers/swapiPerson';
import NavBar from '../NavBar';
import Details from '../Details';
import swapiFilm from '../../helpers/swapiFilm';


const App = () => {
  const [swapiResponse, setSwapiResponse] = useState<swapiPerson[]>([]);
  const [filteredSwapiResponse, setFilteredSwapiResponse] = useState<swapiPerson[]>([]);
  const [page, setPage]= useState<string|null>("https://swapi.dev/api/people/?page=1");
  const [currentlySelected, setCurrentlySelected] = useState<swapiPerson|null>(null)
  const [nameFilter, setNameFilter] = useState<string>("");
  const [filmFilter, setFilmFilter] = useState<swapiFilm[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  //filter all fetched records and store them in useState fillteredSwapiResponse
  const filterResponse = ():void => {
    //if filter is empty filteredResponse is just a response
    if(nameFilter === '') return setFilteredSwapiResponse(swapiResponse);
    const searchUpperCase:string = nameFilter.toUpperCase();
    //check if searched phrase is name of film
    const filmSearched:string|undefined = filmFilter.find(film => film.title.toUpperCase() === searchUpperCase)?.url;
    const filtered:swapiPerson[] = swapiResponse.filter(element => {
      //make filter case insensitive
      const allUpperName:string = element.name.toUpperCase();
      let include:boolean = false;
      if(filmSearched !== undefined){
        element.films.find(film => film === filmSearched) === undefined?include = false : include = true;
      }
      include = include || allUpperName.includes(searchUpperCase);
      return include;
    })
    //if no matching records fetch Data until at least one is found or no more people in db;
    if(filtered.length === 0 && page !== null) {
      fetchData();
    }
    //console.log(filtered);
    setFilteredSwapiResponse(filtered);
  }

  //fetch people data page by page
  const fetchData = ():void => {
    //stop executing when there is no page left or fetching is executing
    if(page === null || isFetching) return;
    setIsFetching(true);
    fetch(page)
    .then(res => res.json())
    .then(json => {
      const results = json.results;
      //console.log(json);
      setSwapiResponse(prev => prev.concat(results));
      json.next==null?setPage(null):setPage(changeToHttps(json.next));
      setIsFetching(false);
    })
  }

  //fetch all films and store them in useState
  const fetchAllFilms = ():void => {
    fetch("https://swapi.dev/api/films")
    .then(res => res.json())
    .then(json => {
      const result = json.results;
      const resultArray:swapiFilm[] = [];
      result.map((el:any) => resultArray.push({title: el.title, url: el.url}))
      setFilmFilter(resultArray);
    })
  }

  //updade filltered records every data fetch or change of input
  useEffect(() => filterResponse(), 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [nameFilter, swapiResponse]);

  //on mount component fetch data
  useEffect(()=> {
    fetchData();

    fetchAllFilms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="main_container">
      <div className="input_nav_wrapper">
        <input type="text" placeholder="StarLook! Type name of character of film" onChange={(e) => setNameFilter(e.target.value)}></input>   
        <NavBar People={filteredSwapiResponse} Fetch={fetchData} SetSelected={setCurrentlySelected} CanLoad={page !== null}/>
      </div>
      {currentlySelected != null && <Details Person={currentlySelected}/>}
    </div>
  );
}

const changeToHttps = (uri: string):string => {
  return 'https'+uri.slice(4);
}

export default App;
