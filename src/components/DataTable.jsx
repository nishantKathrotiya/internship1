import Dataview from './Dataview'
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import Filter from './Filter';


const DataTable = ({ userData }) => {
    return (
        <>
            <div className="header-row">
                Applications
                <input type="text" placeholder="search" id="searchInput" />
            </div>
            <div className="data-table-inner">

                <div className="header-title-row">
                    <div className="colHeader DataNumber">Number</div>
                    <div className="colHeader">Paper Title <Filter id={"title"} /> </div>
                    <div className="colHeader">Date  <Filter id={"date"} /></div>
                    <div className="colHeader">Status  <Filter id={"status"} /></div>
                    <div className="colHeader">Action </div>
                </div>

                {
                    userData.map((data, index) => (
                        <>
                            <div className="row-content">
                                <Dataview key={data._id} data={data} index={index} />
                            </div>
                            <div className="row-content">
                                <Dataview key={data._id} data={data} index={index} />
                            </div>
                            <div className="row-content">
                                <Dataview key={data._id} data={data} index={index} />
                            </div>
                            <div className="row-content">
                                <Dataview key={data._id} data={data} index={index} />
                            </div>
                        </>
                    ))
                }

            </div>
        </>
    )
}

export default DataTable