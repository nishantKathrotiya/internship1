import React, { useEffect, useState, useRef } from "react";
import DataTable from "../components/DataTable";
import MeteorDemo from "../components/Meteors";
import PopUp from "../components/PopUp";

import "../stylesheets/StudentDashboard.css";

import { hodDashboard } from "../services/operation/hod";
import GridPatternDemo from "../components/GridCard";
import useOnClickOutside from "../customHooks/useOnClickOutside";

const HODDashboard = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [countData, setCountData] = useState(null);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);

    const getData = () => {
        hodDashboard(setUserData,setCountData, setLoading);
    }

    // Getting details as soon as page is loaded
    useEffect(() => {
        getData();
    }, []);

    // Event handler for clicking outside the popup
    useOnClickOutside(ref, () => setOpen(false));

    return (
        <div className="studentDashboard">
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div className="outerContainer-cards">
                        <div className="tiles-container">
                            <MeteorDemo name={"H.O.D"} />
                            <GridPatternDemo title={"Total Application"} count={countData.totalCount} />
                            <GridPatternDemo title={"Approved Application"} count={countData.approved} />
                            <GridPatternDemo title={"Rejected Application"} count={countData.rejected} />
                            <GridPatternDemo title={"Returned Application"} count={countData.returned} />
                        </div>

                    </div>

                    {userData == null ? (
                        <h1>Data Not Found</h1>
                    ) : (
                        <div className="dataTable-container">
                            <DataTable userData={userData} id={"hod"} setOpen={setOpen} />
                        </div>
                    )}
                </>
            )}

            {/* Using ref for the PopUp component to detect click outside */}
            {open && (
                <div ref={ref}>
                    <PopUp setOpen={setOpen} getData={getData} />
                </div>
            )}
        </div>
    );
};

export default HODDashboard;
