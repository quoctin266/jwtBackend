import cors from "cors";
require("dotenv").config();

const configCORS = (app) => {
  const corsOptions = {
    origin: process.env.REACT,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  };

  app.use(cors(corsOptions));
};

export default configCORS;
