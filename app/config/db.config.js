module.exports = {
  HOST: "localhost",
  USER: "kalori",
  PASSWORD: "reppu123*",
  DB: "weather",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
