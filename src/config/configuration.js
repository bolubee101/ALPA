// This should be your own database url
module.exports = {
  database:
    process.env.DATABASE||"mongodb://localhost:27017/ALPA",
  jwtsecret: process.env.SECRET||"secret-key-test",
};
