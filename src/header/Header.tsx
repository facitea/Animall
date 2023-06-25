import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <nav>
            <div className="navLeftSide">
                <h1><Link to="/">Animall</Link></h1>
            </div>
            <div className="navRightSide">
                <ul>
                    <li className="navFlexItem"><Link to="/boardList">Board</Link></li>
                    <li className="navFlexItem"><Link to="/training">Training</Link></li>
                    <li className="navFlexItem"><Link to="/shop">Shop</Link></li>
                    <li className="navFlexItem"><Link to="/trip">Trip</Link></li>
                    <li className="navFlexItem"><Link to="/myPage">Me</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;