const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeagueRecordSchema = new Schema({
    status: String,
    teamSize: Number,
    preparationStartTime: String,
    startTime: String,
    endTime: String,
    attacks: Number,
    stars: Number,
    destructionPercentage: Number,
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'League'
        }
    ]
})

module.exports = mongoose.model('LeagueRecord', LeagueRecordSchema);