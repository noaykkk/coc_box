const Page = require('../models/league/leaguePage');
const Index = require('../models/league/leagueIndex');
const Record = require('../models/league/leagueRecord');
const League = require('../models/league/leagues');
const Member = require('../models/clan/member');
const client = require('../public/client');

async function fillInLeague(warTag) {
    var war = await client.clanLeagueWars(warTag).then();
    if(war.clan.tag == process.env.clanTag){
        var clan = war.clan;
    } else if(war.opponent.tag == process.env.clanTag){
        var clan = war.opponent;
    } else{
        return 0;
    }
    // fill in information
    var {members, ...info} = clan;
    var record = new Record(info);
    let year = parseInt(war.startTime.substring(0,4));
    let month = parseInt(war.startTime.substring(5,6));
    let day = parseInt(war.startTime.substring(7,8));
    for(let member of clan.members){
        let warInfo = new League(member);
        warInfo.year = year;
        warInfo.month = month;
        warInfo.day = day;
        warInfo.rank = year*1000 + month*100 + day;
        await warInfo.save();
        record.members.push(warInfo);
        await Member.findOneAndUpdate(
            {tag: warInfo.tag},
            { $push: { warLeague: warInfo}}
        );
    }
    record.save();
    return record._id;
}

module.exports.index = async(req, res) => {
    var indexes = await Index.find({}).sort({month: 1});
    res.render('warLeague/index', {indexes})
}

module.exports.getLeague = async(req, res) => {
    var leagues = await client.clanLeague(process.env.clanTag).then();
    var page = new Page({
        teamSize: 30,
        year: 2021,
        month: 7
    });
    for(let i=0; i<7; i++){
        for(let j=0; j<4; j++){
            let resID = await fillInLeague(rounds[i].warTags[j]);
            if(resID){
                page.days.push(resID);
            }
        }
    }
    page.save();
    var index = new Index();
    await index.page.unshift({month: 7, record: page._id});
    index.save();
    //fill in the leagueIndex model and operations in the next month clanLeague

    var indexes = await Index.find({}).sort({month: 1});
    res.render('warLeague/index', {indexes})
}

module.exports.showLeague = async(req, res) => {
    const { id } = req.params;
    var page = await Page.findById(id).populate({
        path: 'days',
        model: 'LeagueRecord',
        populate: {
            path: 'members',
            model: 'League'
        }
    });
    res.render('warLeague/show', {page})
}

module.exports.getRecentOneLeague = async(req, res) => {
    var page = await Page.findOne({}).sort('days.members.townhallLevel').populate({
        path: 'days',
        model: 'LeagueRecord',
        populate: {
            path: 'members',
            model: 'League'
        }
    });
    res.render('warLeague/show', {page})
}

module.exports.getRecentTwoLeague = async(req, res) => {
}

module.exports.getRecentThreeLeague = async(req, res) => {
}