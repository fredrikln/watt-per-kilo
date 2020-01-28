import React from 'react';

import { useState } from 'react';

import './style.scss';

const POUND = 0.453592; // Pound in kilos

function Calculator() {
  let [unit, setUnit] = useState('kg');
  let [weight, setWeight] = useState(85);
  let [maxWpk, setMaxWpk] = useState(5.0);

  function onUnitChange(event) {
    if (unit === 'lb') setWeight(Math.round(weight * POUND));
    else setWeight(Math.round(weight / POUND));

    setUnit(event.target.value);
  }

  function onWeightChange(event) {
    setWeight(event.target.value);
  }

  function increaseWeight() {
    let newWeight = parseInt(weight, 10) + 1;

    if (isNaN(newWeight)) return setWeight(0);

    return setWeight(newWeight);
  }

  function decreaseWeight() {
    let newWeight = Math.max(weight - 1, 0);

    if (isNaN(newWeight)) return setWeight(0);

    return setWeight(newWeight)
  }

  function getWatts(wpk) {
    if (isNaN(weight) || weight < 0) return '-';

    if (unit === 'kg') return Math.round(wpk * weight);
    return Math.round(wpk * weight * POUND);
  }

  function increaseMaxWpk() {
    setMaxWpk(maxWpk + 0.5);
  }

  function decreaseMaxWpk() {
    let newMaxWpk = Math.max(maxWpk - 0.5, 0.5)
    setMaxWpk(newMaxWpk);
  }

  let rows = Array.from({ length: maxWpk / 0.5 }, (_, index) => {
    return (
      <tr key={index}>
        <th>{((index+1) * 0.5).toFixed(1)}</th>
        <td>{getWatts((index+1) * 0.5)}</td>
      </tr>
    )
  });

  return (
    <div className="Calculator">
      <div className="unit">
        <span>Select weight unit:</span>
        <label><input type="radio" name="unit" id="kg" value="kg" checked={unit === 'kg'} onChange={onUnitChange} /> Metric (kg)</label>
        <label><input type="radio" name="unit" id="unit" value="lb" checked={unit === 'lb'} onChange={onUnitChange} /> Imperial (lb)</label>
      </div>
      <div className="weight">
        <label htmlFor="weight">Enter your weight (in {unit}):</label>
        <div>
          <button onClick={decreaseWeight}>-</button>
          <input type="text" name="weight" id="weight" value={weight} onChange={onWeightChange} />
          <button onClick={increaseWeight}>+</button>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Watts per kilo</th>
              <th>Power (watts)</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button onClick={increaseMaxWpk}>Add row</button>
        <button onClick={decreaseMaxWpk}>Remove row</button>
      </div>
    </div>
  );
}

export default Calculator;
