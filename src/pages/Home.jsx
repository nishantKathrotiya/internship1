import "../stylesheets/Home.css";
import Navbar from "./Navbar";
const Home = () => {
  return (
    <>
    <Navbar />
      <section className="header">  
        <div className="text-box">
          <h1>Charusat University</h1>
          <p>
            To serve society by striving to transform it through creation,<br/>
            augmentation, dissemination and pepetuation of knowledge
          </p>
          <a href="https://www.charusat.ac.in/" target="blank" className="hero-btn">
            Visit Us to Know More
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
