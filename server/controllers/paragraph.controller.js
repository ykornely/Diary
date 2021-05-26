const mongoose = require('mongoose');

const Paragraph = require('../models/paragraph.model.js');

// postman: request settings: POST, localhost:3000/api/register, Body > inputs

module.exports.getParagraphs = (req, res, next) => {
    var paragraphs = Paragraph.find({userId: req._id}, (err, paragraphs) => {
        if (!err) {
            res.send(paragraphs);
        } else {
            return next(err);
        }
    });
}

module.exports.postParagraph = (req, res, next) => {
    // console.log(req.file);
    var paragraph = new Paragraph();
    paragraph.userId = new mongoose.mongo.ObjectId(req._id);
    paragraph.title = req.body.title;
    paragraph.content = req.body.content;
    paragraph.save((err, paragraph) => {
        console.log(err, paragraph);
        if (!err) {
            res.send(paragraph);
        } else {
            return next(err);
        }
    });
}

module.exports.patchParagraph = async (req, res, next) => {
    try {
        const paragraph = await Paragraph.findOne({_id: req.params.paragraphId});
        paragraph.title = req.body.title;
        paragraph.content = req.body.content;
        await paragraph.save();
        // res.send("Success!");
    }
    catch(error) {
        console.error(error);
        // res.status(500).send(error.message)
    }
}

module.exports.deleteParagraph = async (req, res, next) => {
    try {
        await Paragraph.deleteOne({_id: req.params.paragraphId});
        // res.send("Success!");
    }
    catch(error) {
        console.error(error);
        // res.status(500).send(error.message)
    }
}