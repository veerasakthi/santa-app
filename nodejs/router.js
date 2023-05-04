// @ts-check
const express = require("express");
const santaRouter = express.Router();

const {
  getSantaLetterCtrl,
  putSantaLetterCtrl,
} = require("./controller/santaController");

// store santa gift request form children
santaRouter.post("/santa/putSantaLetter", putSantaLetterCtrl);

// get list of letters
santaRouter.post("/santa/getLetters", getSantaLetterCtrl);

module.exports = santaRouter;
