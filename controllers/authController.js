const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const User = require("../modals/userModel");
const AppError = require("g:/tutorials/node.js, express, mongodb & more - the complete bootcamp 2021/complete-node-bootcamp-master/4-natours/after-section-13/utils/apperror");

const signToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "30d",
  });
};

const createSendToken = (user, res) => {
  const token = signToken(user.id);
  user.password = undefined;
  res.status(201).json({
    ...user,
    token,
  });
};

const correctPassword = async (userPassword, hash) => {
  return await bcrypt.compare(userPassword, hash);
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next("You are not logged in! Please log in to get access.");
  }

  // 2) Verification token
  // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const decoded = await jwt.verify(token, "secret");
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next("The user belonging to this token does no longer exist.");
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.createUser = catchAsync(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const odlUser = await User.findByEmail(email);
  if (odlUser?.length) {
    return res.json({
      status: 200,
      message: "user already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const [user] = await User.create(
    firstName,
    lastName,
    username,
    email,
    hashedPassword
  );
  createSendToken(user, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next("Please provide email and password!");
  }
  const user = await User.findByEmail(email);

  if (!user || !(await correctPassword(password, user.password))) {
    return next("Incorrect email or password");
  }
  createSendToken(user, res);
});
