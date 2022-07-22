require("dotenv/config");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const mUri = process.env.MONGO_URI + "/" + process.env.MONGO_COLLECTION;
const mOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mUri, mOptions);

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es requerido"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "el email es requerido"],
  },
  password: {
    type: String,
    required: [true, "la contraseña es requerida"],
  },
  creadoEl: {
    type: Date,
    default: new Date(),
  },
});

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

schema.methods.matchPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

module.exports = mongoose.model("User", schema);
