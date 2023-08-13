const express = require("express");
const router = express.Router();
const db = require("../models");
const User=db.User
const passport = require("passport");

app.use(passport.initialize());

const LocalStrategy = require("passport-local");



