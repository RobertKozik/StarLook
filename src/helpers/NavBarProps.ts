import swapiPerson from "./swapiPerson";

interface NavBarProps {
    People: swapiPerson[];
    Fetch: Function;
    SetSelected: Function;
    CanLoad: boolean;
}

export default NavBarProps;