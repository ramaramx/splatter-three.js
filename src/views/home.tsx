import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <>
        <div style={{textAlign: 'center', color: 'white', fontSize: '24px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 0)'}}>Gaussian Splatting</div>
        <Link to="/scene1"><h1 style={{textAlign: 'center', color: 'white', fontSize: '24px', position: 'absolute', top: '51%', left: '50%', transform: 'translate(-50%, 0)'}}>Scene 1</h1> </Link>
        </>
    )
}

export default Home