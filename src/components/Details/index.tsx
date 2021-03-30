import { useState } from "react";
import DetailsProps from "../../helpers/DetailsProps";

const Details = ({Person}: DetailsProps) => {
    const [details, setDetails] = useState(null);

    return (
            details == null?
                            <>
                            </>
                            :<section>
                                <h1>{Person.name}</h1>
                            </section>
    )
}

export default Details;