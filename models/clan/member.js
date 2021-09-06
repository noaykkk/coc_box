const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    tag: String,
    name: String,
    role: String,
    expLevel: Number,
    leagueUrl: String,
    trophies: Number,
    versusTrophies: Number,
    clanRank: Number,
    previousClanRank: Number,
    donations: Number,
    donationsReceived: Number,
    warLeague: [
        {
            type: Schema.Types.ObjectId,
            ref: 'League'
        }
    ]
})

module.exports = mongoose.model('Member', MemberSchema);