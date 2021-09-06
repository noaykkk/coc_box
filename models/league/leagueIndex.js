const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeagueIndexSchema = new Schema({
    page: [
        {
            month: Number,
            record:{
                type: Schema.Types.ObjectId,
                ref: 'LeaguePage'
            }
        }
    ]
})

module.exports = mongoose.model('LeagueIndex', LeagueIndexSchema);