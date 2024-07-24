import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const formatNumber = (count) => {
  if (count >= 100000) {
    // Convert to 'L' format for lakhs
    const formatted = (count / 100000).toFixed(1); // Ensure one decimal place
    return `${formatted}L`;
  } else if (count >= 1000) {
    // Convert to 'K' format for thousands
    const formatted = (count / 1000).toFixed(1); // Ensure one decimal place
    return `${formatted}K`;
  } else {
    // Return the original number if less than 1000
    return count.toString();
  }
};

const StatCard = ({ title, count }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="statsContainer" ref={ref}>
      <h1 className="h1Title uniqueText  ">{title}</h1>
      <h1 className="contentNumber uniqueText">
        {count < 1000 && inView && count !== 0 ? (
          <CountUp end={count} duration={2} separator="," />
        ) : (
          inView && count !== 0 && (
            <span style={{ marginLeft: '0.2em' }}>{formatNumber(count)}</span>
          )
        )}

        {inView && count !== 0 && '+'}

        {inView && count === 0 && '0'}
      </h1>
    </div>
  );
};

export default StatCard;
