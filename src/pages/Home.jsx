import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import StatCard from "../components/StatCard";
import Carousel from "../components/Carousel";
import BottomStat from "../components/BottomStat";
import { getStats } from "../services/operation/common";
import CharusatLogo from '../assets/Charusat-Full.jpg'
import "../stylesheets/Home.css";
const Home = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalPendingApplications: 0,
    totalApprovedApplications: 0,
    totalAmountGiven: 0,
    amountGivenForWebScience: 0,
    amountGivenForScopus: 0
  });

  useEffect(() => {
    getStats(setStats);
  }, [])

  return (
    <>
      <Navbar />
      <section className="header">
        <div className="text-box">
          <h1>Charotar University of Science and Technology</h1>
          <p>
            To serve society by striving to transform it through creation,<br />
            augmentation, dissemination and perpetuation  of knowledge
          </p>
          <a href="https://www.charusat.ac.in/" target="blank" className="hero-btn">
            Visit Us to Know More
          </a>
        </div>
      </section>

      <section className="fitSize">
        <Carousel />
      </section>



      <section className="details">
        <div className="bloom" />
        <div className="content">
          <div className="topContentContainer">
            <StatCard title={"Total Applications"} count={stats.totalAmountGiven} />
            <StatCard title={"Approved Applications"} count={stats.totalApprovedApplications} />
            <StatCard title={"Inprogress Applications"} count={stats.totalPendingApplications} />
          </div>
          <div className="bottomContentContainer">
            <div className="bottomContainerContent1"><BottomStat title={"Total Grant Given"} count={stats.totalAmountGiven} /></div>
            <div className="bottomContainerContent1 hide"><BottomStat title={"Scoups"} count={stats.amountGivenForScopus} /></div>
            <div className="bottomContainerContent1 hide"> <BottomStat className="hide" title={"Web Of Science"} count={stats.amountGivenForWebScience} /></div>
          </div>
        </div>

        <div className="footer">
          <div className="leftDivFooter">
            <img src={CharusatLogo} alt="Charusat" />
          </div>
          <div className="rightDivFooter">
            <div className="leftFooterContent">
              <span className="footerText">Designed and Devloped by<br></br></span>
              <span className="footerText">Meet Gami (22DIT015)<br></br></span>
              <span className="footerText">Meet Jasani (22DIT017)<br></br></span>
              <span className="footerText">Nishant kathrotiya (22DIT022)<br></br></span>
            </div>
            <div className="rightFooterContent">
              <span className="footerText">Under The Guidance Of<br></br></span>
              <span className="footerText">Dr. Bankin Patel<br></br></span>
              <span className="footerText">Prof. Hitesh Makawana<br></br></span>
            </div>
          </div>
        </div>

      </section>

    </>
  );
};

export default Home;
