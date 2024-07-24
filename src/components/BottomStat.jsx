import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const BottomStat = ({ title, count }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="minflex" ref={ref}>
            <h1 className="uniqueText bottomTitle">{title}</h1>
            <h1 className="uniqueText bottomTitle">
                {inView && count !== 0 ? (
                    <CountUp end={count} duration={2} separator="," />
                ) : (
                    '0'
                )}
                {inView && count !== 0 && '+'}
            </h1>
        </div>
    );
};

export default BottomStat;
