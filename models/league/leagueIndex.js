const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeagueIndexSchema = new Schema({
    sort: Number,
    page: [
        {
            month: Number,
            rank: Number,
            record:{
                type: Schema.Types.ObjectId,
                ref: 'LeaguePage'
            }
        }
    ]
})

module.exports = mongoose.model('LeagueIndex', LeagueIndexSchema);