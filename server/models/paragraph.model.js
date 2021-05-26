const mongoose = require('mongoose');

const paragraphSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model('Paragraph', paragraphSchema);