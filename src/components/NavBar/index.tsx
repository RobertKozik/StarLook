import NavBarProps from "../../helpers/NavBarProps";


const NavBar = ({People}: NavBarProps) => {
    
    
    return (
        <nav>
            <ol>
                {People.map((Person, key) => {
                    return (
                        <li key={key}>
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