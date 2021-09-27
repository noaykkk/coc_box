const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaguePageSchema = new Schema({
    year: Number,
    month: Number,
    teamSize: Number,
    rank: Number,
    days:[
        {
            type: Schema.Types.ObjectId,
            ref: 'LeagueRecord'
        }
    ]
})

module.exports = mongoose.model('LeaguePage', LeaguePageSchema);