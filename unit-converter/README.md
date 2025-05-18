# Unit Converter

Sample solution for the [Unit Converter](https://roadmap.sh/projects/unit-converter) challenge from [roadmap.sh](https://roadmap.sh/).

A web-based unit converter that supports length, weight, and temperature conversions.

## Features

- Convert between different units of length (millimeter, centimeter, meter, kilometer, inch, foot, yard, mile)
- Convert between different units of weight (milligram, gram, kilogram, ounce, pound)
- Convert between different temperature scales (Celsius, Fahrenheit, Kelvin)
- Clean and intuitive user interface
- Navigation between different converter types

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd unit-converter
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the server:

```bash
pnpm start
```

For development with hot reload:

```bash
pnpm dev
```

## Usage

Access the application at `http://localhost:3000`. Choose the type of conversion you want to perform:

- Length conversion: `/length`
- Weight conversion: `/weight`
- Temperature conversion: `/temperature`

Enter your value, select the units to convert from and to, then click "Convert".

## Project Structure

```
unit-converter/
├── constants/
│   ├── routes.js     # Route definitions
│   ├── units.js      # Unit conversion constants
│   └── index.js      # Export constants
├── public/
│   ├── form.css      # Form styles
│   └── result.css    # Result page styles
├── server/
│   ├── index.js      # Express server setup
│   └── routes.js     # Route handlers
├── utils/
│   └── converter.js  # Conversion logic
├── views/
│   ├── length.html       # Length converter page
│   ├── weight.html       # Weight converter page
│   ├── temperature.html  # Temperature converter page
│   └── result.html       # Conversion result page
└── package.json      # Project dependencies
```

## Dependencies

- Express - Web framework
- Body Parser - Request body parsing middleware
- Nodemon (dev) - Development server with hot reload

## License

ISC
