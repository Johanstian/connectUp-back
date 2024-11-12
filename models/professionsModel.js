const mongoose = require('mongoose');
const mongoosePagination = require('mongoose-paginate-v2');

const ProfessionSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

ProfessionSchema.plugin(mongoosePagination);

module.exports = mongoose.model('Profession', ProfessionSchema, 'professions');