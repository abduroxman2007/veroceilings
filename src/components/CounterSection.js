
import React, { useEffect, useState } from 'react';
import '../styles/counter.css';

function useAnimatedCounter(target, duration) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function CounterSection() {
  const projects = useAnimatedCounter(300, 1200);
  const years = useAnimatedCounter(15, 1200);
  const clients = useAnimatedCounter(100, 1200);

  return (
    <div className="counter-section">
      <div className="counter-block">
        <span className="counter-icon">🏆</span>
        <div className="counter-value">{projects}+</div>
        <div className="counter-text">Successful Projects</div>
      </div>
      <div className="counter-block">
        <span className="counter-icon">🛡️</span>
        <div className="counter-value">{years}+</div>
        <div className="counter-text">Years Warranty</div>
      </div>
      <div className="counter-block">
        <span className="counter-icon">🤝</span>
        <div className="counter-value">{clients}+</div>
        <div className="counter-text">Major Clients</div>
      </div>
    </div>
  );
}

export default CounterSection;
