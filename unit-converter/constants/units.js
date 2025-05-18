const weightUnits = {
  milligram: 0.001,
  gram: 1,
  kilogram: 1000,
  ounce: 28.3495,
  pound: 453.592,
};

const lengthUnits = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
};

const temperatureUnits = {
  celsius: (value) => value,
  fahrenheit: (value) => (value - 32) * (5 / 9),
  kelvin: (value) => value - 273.15,
};

export { weightUnits, lengthUnits, temperatureUnits };
