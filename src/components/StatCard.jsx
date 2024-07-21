import React from 'react'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatCard = ({ title, count }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="statsContainer" ref={ref}>
      <h1 className="h1Title uniqueText">{title}</h1>
      <h1 className="contentNumber uniqueText">
        {inView && count !== 0 ? (
          <CountUp end={count} duration={2} separator="," />
        ) : (
          '0'
        )}
        {inView && count !== 0 && '+'}
      </h1>
    </div>
  )
}

export default StatCard