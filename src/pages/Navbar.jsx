import "../stylesheets/Navbar.css";
import charusatlogo from "../assets/Charusat-Logo.png";
import depstarlogo from "../assets/Depstar-Logo.png";
const Navbar = () => {
  return (
    <>
      <section className="navbar">
        <div className="logos">
          <img src={charusatlogo} alt="" />
          <img src={depstarlogo} alt="" />
        </div>
        <div className="bar">
          <ul>
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
          </ul>
        </div>
        <div className="login-signup">
        <button className="signup">Sign Up</button>
        <button className="login">Log In</button>
        </div>
      </section>
    </>
  );
};
export default Navbar;
