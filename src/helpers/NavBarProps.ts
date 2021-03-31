import swapiPerson from "./swapiPerson";

interface NavBarProps {
    People: swapiPerson[];
    Fetch: Function;
    SetSelected: Function;
}

export default NavBarProps;