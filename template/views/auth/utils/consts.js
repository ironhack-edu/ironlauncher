const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/{{name}}";

module.exports = MONGO_URI;
