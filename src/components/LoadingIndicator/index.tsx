import loadingSVG from './star-wars-seeklogo.com.svg'
import './style.css';
const LoadingIndicator = () => {

    return (
        <div className="inner_loading_wrapper">
            <img src={loadingSVG} alt="Loading..." />
        </div>
    )
}

export default LoadingIndicator;