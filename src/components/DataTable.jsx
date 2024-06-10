import Dataview from './Dataview'
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import Filter from './Filter';

const DataTable = ({ userData }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(userData);

    useEffect(() => {
        const filtered = userData.filter(data => data.paperTitle.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filtered);
    }, [searchQuery, userData]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="header-row">
                Applications
                <input type="text" placeholder="search" id="searchInput" value={searchQuery} onChange={handleSearchChange} />
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
                    filteredData.map((data, index) => (
                        <>
                            <div className="row-content" key={data._id}>
                                <Dataview data={data} index={index} status={'approved'} />
                            </div>

                        </>


                    ))
                }

            </div>
        </>
    )
}

export default DataTable
