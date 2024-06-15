import "../stylesheets/Navbar.css";
import charusatlogo from "../assets/Charusat-Logo.png";
import depstarlogo from "../assets/Depstar-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operation/authApi";
const Navbar = ({bgwhite=false}) => {
  const { token } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <section className={bgwhite?('navbar bg-white') : ('navbar')}>
       <Link to="/">
       <div className="logos">
          <img src={charusatlogo} alt=""  />
          <img src={depstarlogo} alt="" id="charusat" />
        </div>
       </Link>
        <div className="bar">
          {/* <ul>
            <li>
              <a>Untitle 1</a>
            </li>
            <li>
              <a>Untitle 2</a>
            </li>
            <li>
              <a>Untitle 3</a>
            </li>
            <li>
              <a>Untitle 4</a>
            </li>
          </ul> */}
        </div>
        <div className="login-signup">
          {
            !token ? (
              <>
                <Link to="/signup" className="link"><div className="signup">Sign Up</div></Link>
                <Link to="/login" className="link"><div className="signup">Log In</div></Link>
              </>
            ) : (

              <>
                <Link to={`/${user.role}`} className="link"><div className="signup">Dashboard</div></Link>
                <div className="signup" onClick={()=>dispatch(logout(navigate))}>Log Out</div>
              </>
            )
          }
        </div>
      </section>
    </>
  );
};
export default Navbar;
