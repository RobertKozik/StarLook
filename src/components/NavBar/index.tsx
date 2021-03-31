import NavBarProps from "../../helpers/NavBarProps";
import {useState} from 'react';

import LoadingIndicator from '../LoadingIndicator';

import "./style.css";

const NavBar = ({People, Fetch, SetSelected, CanLoad}: NavBarProps) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    
    // checks if element is scrolled to bottom
    const scrollListener = (event: any) => {
        var node = event.target;
        const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
        if (bottom && !isFetching) {    
            setIsFetching(true);  
        //console.log("BOTTOM REACHED:",bottom); 
        Fetch();

        setTimeout(() => setIsFetching(false), 500);
        }   
    }

    return (
        <nav onScroll={scrollListener} className="nav_bar">
            <ul>
                {People.map((Person, key) => {
                    return (
                        <li key={key} onClick={() => SetSelected(People[key])}>
                            <h2 className="name_header">{Person.name}</h2>
                            <div className="info_wrapper">
                                <h3 className="additional_info"><label>Gender: </label> {Person.gender}</h3> 
                                <h3 className="additional_info"><label>Birth date: </label>{Person.birth_year}</h3>
                            </div>
                        </li>
                    );
                })}
                
                    {CanLoad && <li><LoadingIndicator /></li>}
                
            </ul>
        </nav>
    )
}

export default NavBar;