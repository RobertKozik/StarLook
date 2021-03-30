import NavBarProps from "../../helpers/NavBarProps";


const NavBar = ({People, Click, SetSelected}: NavBarProps) => {
    
    
    return (
        <nav style={{overflow: "auto", height: "80vh", width: "30vw", backgroundColor: "aqua"}}>
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
            <button onClick={() => Click()}>
                Click me!
            </button>
        </nav>
    )
}

export default NavBar;