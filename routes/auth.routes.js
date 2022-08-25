const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isAuthenticated = require("../middlewares/isAuthenticated");

//* POST "/api/auth/signup" => Create user in DB
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  //! GC
  //! Empty fields
  if (!username) {
    res.status(400).json({ errorMessage: "Nombre de usuario requerido" });
    return;
  }
  if (!email) {
    res.status(400).json({ errorMessage: "Email requerido" });
    return;
  }
  if (!password) {
    res.status(400).json({ errorMessage: "Contraseña requerida" });
    return;
  }
  //! Password Regex
  const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "La contraseña debe contener entre 8 y 64 caracteres, mínimo una mayúscula, una minúscula, un número y un carácter especial ",
    });
    return;
  }
  //! Email Regex
  const emailRegex =
    /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
  if (emailRegex.test(email) === false) {
    res.status(400).json({
      errorMessage: "Dirección de correo inválida",
    });
    return;
  }

  try {
    //! Email already exist
    const foundUserByEmail = await User.findOne({ email });
    if (foundUserByEmail !== null) {
      res.status(400).json({ errorMessage: "Correo electrónico en uso" });
    }
    //! Username already exist
    const foundUserByUsername = await User.findOne({ username });
    if (foundUserByUsername !== null) {
      res.status(400).json({
        errorMessage: "El nombre de usuario ya se encuentra en uso",
      });
    }

    //! Password Encryption
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json();
  } catch (error) {
   
    next(error);
  }
});

//* POST "./api/auth/login" => Validate user credentials
router.post("/login", async (req, res, next) => {

  const { access, password } = req.body;

  //! GC
  //! Empty fields
  if (!access) {
    res
      .status(400)
      .json({ errorMessage: "Introduzca su email o Nombre de usuario" });
    return;
  }
  if (!password) {
    res.status(400).json({ errorMessage: "Introduzca su contraseña" });
    return;
  }

  try {
    //! User exist in DB
    const foundUser = await User.findOne({
      $or: [{ username: access }, { email: access }],
    });
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Usuario no encontrado" });
      return;
    }
    //! Valid password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Contraseña no válida" });
    }
    //! JWT token
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    };
    console.log("payload", payload);
    //TODO Cambiar el tiempo de expiracion
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "200h",
    });
    console.log("authToken login", authToken);
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    console.log("Login error", error);
    next(error);
  }
});
//* GET "./api/auth/verify" => Verify user is validated and active
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("req.payload verify ", req.payload);
  res.json(req.payload);
});

module.exports = router;
