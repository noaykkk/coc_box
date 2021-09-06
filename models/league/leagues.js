const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
    tag: String,
    name: String,
    townhallLevel: Number,
    mapPosition: Number,
    year: Number,
    montn: Number,
    day: Number,
    rank: Number,
    attacks: [
        {
            attackerTag: String,
            defenderTag: String,
            stars: Number,
            destructionPercentage: Number,
            order: Number,
            duration: Number
        }
    ],
    opponentAttacks: Number,
    bestOpponentAttack: [
        {
            attackerTag: String,
            defenderTag: String,
            stars: Number,
            destructionPercentage: Number,
            order: Number,
            duration: Number
        }
    ]
})

module.exports = mongoose.model('League', LeagueSchema);