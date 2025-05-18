import {
  lengthUnits,
  weightUnits,
  temperatureUnits,
} from "../constants/units.js";

const convertLength = (value, fromUnit, toUnit) => {
  if (!lengthUnits[fromUnit] || !lengthUnits[toUnit]) {
    throw new Error("Invalid unit");
  }

  return (value * lengthUnits[fromUnit]) / lengthUnits[toUnit];
};

const convertWeight = (value, fromUnit, toUnit) => {
  if (!weightUnits[fromUnit] || !weightUnits[toUnit]) {
    throw new Error("Invalid unit");
  }

  return (value * weightUnits[fromUnit]) / weightUnits[toUnit];
};

const convertTemperature = (value, fromUnit, toUnit) => {
  if (!temperatureUnits[fromUnit] || !temperatureUnits[toUnit]) {
    throw new Error("Invalid unit");
  }

  return temperatureUnits[toUnit](temperatureUnits[fromUnit](value));
};

export { convertLength, convertWeight, convertTemperature };
