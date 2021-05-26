const express = require('express');
const router = express.Router();

// ctrlUser has the exported register function from user.controller.js
const ctrlUser = require('../controllers/user.controller');
const ctrlParagraph = require('../controllers/paragraph.controller');

const jwtHelper = require('../config/jwtHelper');

// ctrlUser.register is the function which can handle the user sign up request from the client side (declined in user.controller)
router.post('/register', ctrlUser.register);

router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile); // private route, token required

router.post('/diary', jwtHelper.verifyJwtToken, ctrlParagraph.postParagraph);
router.get('/diary', jwtHelper.verifyJwtToken, ctrlParagraph.getParagraphs);
router.patch('/diary/:paragraphId', jwtHelper.verifyJwtToken, ctrlParagraph.patchParagraph);
router.delete('/diary/:paragraphId', jwtHelper.verifyJwtToken, ctrlParagraph.deleteParagraph);

// using this exported router constant we can configure routing middleware inside this app
module.exports = router;