import React from 'react';
import depstarBW from "../assets/bwlogos/depstarbw.png";
import cspitBw from "../assets/bwlogos/cspitbw.png";
import aripBw from "../assets/bwlogos/aripbw.png";
import cmpicaBW from "../assets/bwlogos/cmpicabw.png";
import cipsBW from "../assets/bwlogos/cipsbw.jpg";
import iiimBW from "../assets/bwlogos/iiimbw.png";
import mtinBW from "../assets/bwlogos/mtinbw.png";
import pdpisBW from "../assets/bwlogos/pdpisbw.png";
import rpcpBW from "../assets/bwlogos/rpcpbw.png";


const Carousel = () => {
    return (
        <div className="carousel-container">
            <h1 className="h1Title uniqueText logosText">Our Institute</h1>
            <div className="moving-div">

                <div className="move">
                    <img src={depstarBW} alt="depstarBW" />
                    <img src={cspitBw} alt="cspitBw" />
                    <img src={aripBw} alt="aripBw" />
                    <img src={cmpicaBW} alt="cmpicaBW" />
                    <img src={cipsBW} alt="cipsBW" />
                    <img src={iiimBW} alt="iiimBW" />
                    <img src={mtinBW} alt="mtinBW" />
                    <img src={pdpisBW} alt="pdpisBW" />
                    <img src={rpcpBW} alt="rpcpBW" />
                </div>
                <div className="move">
                    <img src={depstarBW} alt="depstarBW" />
                    <img src={cspitBw} alt="cspitBw" />
                    <img src={aripBw} alt="aripBw" />
                    <img src={cmpicaBW} alt="cmpicaBW" />
                    <img src={cipsBW} alt="cipsBW" />
                    <img src={iiimBW} alt="iiimBW" />
                    <img src={mtinBW} alt="mtinBW" />
                    <img src={pdpisBW} alt="pdpisBW" />
                    <img src={rpcpBW} alt="rpcpBW" />
                </div>

                <div className='mask'>
                    <div className='mask1'></div>
                    <div className='mask2'></div>
                </div>


            </div>
            
        </div>
    );
}

export default Carousel;
