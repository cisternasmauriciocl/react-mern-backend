const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN);

    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("error a la hora de inicializar BD");
  }
};

module.exports = {
  dbConnection,
};
