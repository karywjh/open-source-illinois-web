// const Member = require('../models/member.model');
const BaseController = require('./base.controller');
const util = require('util');

class MemberController extends BaseController{
  constructor(name){
    super(name);
    this.getMember = this.getMember.bind(this);
    this.pendingMembers = this.pendingMembers.bind(this);
  }
  getMember(req, res, next){
    console.log("Getting record of " + req.params.github + " in members");
    var github = req.params.github;
    this.model.findOne({github: github}, (err, member)=>{
      if(err){
        next(err);
        console.log('Error occured');
      }
      else{
        console.log(member);
        return res.send(member);
      }
    })
  }

  async pendingMembers(req, res, next){
    var pendingMembers = JSON.parse(req.query.pending);
    this.model.find({_id: pendingMembers}, (err, members) => {
      if(err){
        console.log('Error occurred');
        console.log(err);
      }
      else {
        console.log('Pending Members are ' + members);
        return res.send(members);
      }
    })
  }
  //Add new member
  add(req, res, next){
    var body = req.body;
    console.log(body);
    var newMember = new this.model({    //Try to add a constructor to member.model
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      picture: body.picture,
      github: body.github
    });
    newMember.save((err) =>{
      if(err){
        console.log('rip bro, you done fucked');
      }
      else{
        res.status(200);
        res.json({
          message: body.firstname + " "+ body.lastname + ' successfully registered'
        });
      }
    })
  }
}

module.exports = MemberController
