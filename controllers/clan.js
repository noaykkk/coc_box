const Member = require('../models/clan/member');
const PrevMember = require('../models/clan/prevMember');
const client = require('../public/client');

function roleUpdate(role) {
    if(role=='leader') {
        return '首领';
    } else if(role=='coLeader'){
        return '副首领';
    } else if(role=='admin'){
        return '长老';
    } else if(role=='member'){
        return '成员';
    } 
}

async function updateMemberInfo(updateMem, info){
    if(updateMem) {
        info.stillInClan = true;
        info.role = roleUpdate(info.role);
        info.leagueUrl = info.league.iconUrls.tiny;
        await Member.findByIdAndUpdate(updateMem._id, {...info});
    }
    else{
        var newMember = new Member(info);
        newMember.role = roleUpdate(newMember.role);
        newMember.leagueUrl = info.league.iconUrls.tiny;
        newMember.stillInClan = true;
        await newMember.save();
    }
}

async function findMemberAndUpdate(membersInfo) {
    for(let memberInfo of membersInfo){
        await Member.find({tag: memberInfo.tag}).exec(function(err, resMemberInfo){
            updateMemberInfo(resMemberInfo[0], memberInfo);
        });
    }
}

function comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other.tag == current.tag
      }).length == 0;
    }
}

async function deleteNotExistMember(currentMembers) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    await Member.find().exec(async function(err, members){
        var prevMembers = members.filter(comparer(currentMembers));
        for(let prevMember of prevMembers) {
            var addPrevMember = new PrevMember();
            addPrevMember.tag = prevMember.tag;
            addPrevMember.name = prevMember.name;
            addPrevMember.warLeague = prevMember.warLeague;
            addPrevMember.notExistDate = date;
            await addPrevMember.save();
            await Member.findByIdAndDelete(prevMember._id);
        }
    });
}

async function addExistMember(currentMembers) {
    for(let currentMember of currentMembers){
        await PrevMember.find({tag: currentMember.tag}).exec(function(err, deleteMember){
            if(deleteMember){
                PrevMember.findByIdAndDelete(deleteMember._id);
            }
        })
    }
}

module.exports.index = async(req, res) => {
    var members = await Member.find({}).sort({clanRank: 1});
    res.render('myClan/index', {members})
}

module.exports.listMember = async(req, res) => {
    var members = await client.clanMembersByTag(process.env.clanTag).then();
    for(let member of members.items) {
        var newMember = new Member(member);
        newMember.role = roleUpdate(newMember.role);
        newMember.leagueUrl = member.league.iconUrls.tiny;
        newMember.stillInClan = true;
        await newMember.save();
    }
    req.flash('success','成功更新部落成员');
    res.redirect('/myClan');
}

module.exports.updateMember = async(req, res) =>{
    var updateMembers = await client.clanMembersByTag(process.env.clanTag).then();
    await findMemberAndUpdate(updateMembers.items).then();
    await deleteNotExistMember(updateMembers.items).then();
    await addExistMember(updateMembers.items).then();

    setTimeout(async function(){
        var members = await Member.find({}).sort({clanRank: 1});
        res.render('myClan/index', {members})
    }, 1000);
}

module.exports.memHistory = async(req, res) =>{
    var history = await PrevMember.find({});
    res.render('myClan/history', {history})
}