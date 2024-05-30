import { CirclesWithBar } from 'react-loader-spinner';
import './styled.css'

const Loader = () => {
    return (<div className='loader-wrapper'><CirclesWithBar className='loader'
        height="100"
        width="100"
        color="coral"
        wrapperStyle={{}}
        visible={true}
        barColor=""
        ariaLabel="circles-with-bar-loading"
    /></div>)
}

export default Loader;