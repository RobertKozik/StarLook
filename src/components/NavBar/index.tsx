import NavBarProps from "../../helpers/NavBarProps";
import {useState} from 'react';

const NavBar = ({People, Fetch, SetSelected}: NavBarProps) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    
    
    const scrollListener = (event: any) => {
        var node = event.target;
        const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
        if (bottom && !isFetching) {    
            setIsFetching(true);  
        console.log("BOTTOM REACHED:",bottom); 
        Fetch();

        setTimeout(() => setIsFetching(false), 500);
        }   
    }

    return (
        <nav onScroll={scrollListener} style={{overflow: "auto", height: "80vh", width: "30vw", backgroundColor: "aqua"}}>
            <ol>
                {People.map((Person, key) => {
                    return (
                        <li key={key} onClick={() => SetSelected(People[key])}>
                            <h2>{Person.name}</h2>
                            <h3>{Person.gender}</h3> <h3>{Person.birth_year}</h3>
                        </li>
                    );
                })}
            </ol>
        </nav>
    )
}

export default NavBar;