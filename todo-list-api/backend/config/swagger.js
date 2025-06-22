import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Todo List API",
    description:
      "RESTful API for managing a to-do list with user authentication",
  },
  servers: [
    {
      url: "http://localhost:4000", // by default: 'http://localhost:3000'
      description: "", // by default: ''
    },
  ],
  // host: "localhost:4000",
  // basePath: "/",
  // schemes: ["http", "https"],
  // consumes: ["application/json"],
  // produces: ["application/json"],
  // securityDefinitions: {
  //   apiKeyAuth: {
  //     type: "apiKey",
  //     in: "header", // can be 'header', 'query' or 'cookie'
  //     name: "X-API-KEY", // name of the header, query parameter or cookie
  //   },
  // },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
