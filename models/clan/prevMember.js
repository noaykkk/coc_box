const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrevMemberSchema = new Schema({
    tag: String,
    name: String,
    notExistDate: String,
    warLeague: [
        {
            type: Schema.Types.ObjectId,
            ref: 'League'
        }
    ]
})

module.exports = mongoose.model('PrevMember', PrevMemberSchema);