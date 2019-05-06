var express = require('express');
var cors = require('cors');
var mongo = require('mongodb');
var mongoose=require('mongoose');
var usersdb= mongoose.model("usersdb");
var user_schema= mongoose.model("usersdb");
var candidate = mongoose.model("candidate1");
var cand1=require('../models/candidate1');
var async= require("async");
var bcrypt = require('bcryptjs');


module.exports.deactivateA = function(req, res) {
     var uname=req.query.res;
     console.log(uname);
    //send json response
    usersdb.findOneAndDelete({roll_number:uname},function(err,result){
        if (err){
          if(req.header('postman-token')){
          
          res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
          }
          else{
            res.render("del_fail");
          }
        } 
        else if(!result){
          if(req.header('postman-token')){res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});}
            else{res.render("del_fail");}
        }
        else{  
          console.log(result)
           // res.status(403).send({status:403,token:globalstring,data: result, message: "operation successful "});
            res.render("del_success");
            
        }
    });

    
    
};
module.exports.searchuserRoll= function(req, res) {
    var uroll=req.query.search;
   //send json response
   usersdb.find({roll_number:uroll},function(err,result){
       if (err){
        if(req.header('postman-token')){
          res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
        }
        else{ res.render("failSearch",{data:'Some Internal Error Occured'});}
       }
      
       else if(result.length==0){
        if(req.header('postman-token')){
          res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
        }
        else{ res.render("failSearch",{data:'Not found any Voter against your query!'});}
       }
       //

       else{  
        //res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
        res.render("viewVoterlist",{data:result});
       }
   });

   
   
};
module.exports.searchuserUname= function(req, res) {
    var uname=req.query.search1;
    console.log(uname);
   //send json response
   usersdb.find({username:uname},function(err,result){
       if (err){
        if(req.header('postman-token')){
          res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
        }
        else{ 
          res.render("failSearch",{data:'Some Internal Error Occured'});
       }
       }
      
       else if(result.length==0){
        if(req.header('postman-token')){
          res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
        }
        else{ 
          res.render("failSearch",{data:'Not found any Voter against your query!'});
       }
       }
       //
       else{ 
        //res.status(400).send({status:400,token:globalstring,data: result, message: "found"}); 
           console.log('done');
          // res.json(result);
          res.render("viewVoterlist",{data:result});
       }
   });

   
   
};
module.exports.addAdmin= function(req, res) {
    var uname=req.body.username;
    var password=req.body.password;
    var roll=req.body.Roll_number;
    var Cnic=req.body.CNIC;
    var dob=req.body.dob;
    var address=req.body.address;
    var gender=req.body.gender;
    var batch=req.body.batch;
    var GCnic=req.body.gcnic;
    var phone=req.body.phone_number;
    var type=false;
    console.log('i m here');

    console.log(req.body);
if (req.body.username && req.body.Roll_number && req.body.password) {
    var usersdb = {
        username:req.body.username,
        password:req.body.password,
        roll_number:req.body.Roll_number,
        CNIC:Cnic,
        dob:dob,
        Address:address,
        Gender:gender,
        Batch:batch,
        guardian_cnic:GCnic,
        phone_number:phone,
        type:false,
        votedFor:null
    }

    //use schema.create to insert data into the db
    user_schema.create(usersdb, function (err, user) {
      if (err){
        if(req.header('postman-token')){
          res.status(405).send({status:405,data: null, message: "internal error occured"});
        }
        else{ 
          res.render("failAd",{
            data:
          "Internal error!! You might be entering a duplicate roll-number"
          });
       }
       
       // 
      } 
      else if(user.length==0){
        
          if(req.header('postman-token')){
            res.status(404).send({status:404,data: null, message: "not found"});
          }
          else{ 
            res.render("failAd",{
              data:
            "Internal error!! You might be entering a duplicate roll-number"
            });
         }
        
      }
        //
      else { 
        if(req.header('postman-token')){
          res.status(400).send({status:400,token:globalstring,data: user, message: "found"});
        }
        else{ 
          res.render("successA",{
            data:"submitted"
          });
       }
       // globalstring=req.body.roll_number;
       // res.status(400).send({status:400,token:globalstring,data: user, message: "found"});
        

      }
    });
  }
  else {  
    if(req.header('postman-token')){
      res.status(401).send({status:401,data: null, message: "field(s) empty"});
    }
    else{ 
      res.render("failAd",{
        data:"Please fill all fields.."
      });
    }
     //
}
   
};
module.exports.addNewUser= function(req, res) {
    var uname=req.body.nam;
    var password=req.body.pass;
    var roll=req.body.email;
    var Cnic=req.body.CNIC;
    var dob=req.body.dob;
    var address=req.body.address;
    var gender=req.body.gender;
    var batch=req.body.Batch;
    var GCnic=req.body.gcnic;
    var phone=req.body.phone_number;
    var type=true;
   
if (req.body.nam && req.body.email && req.body.pass) {
    var usersdb = {
        username:uname,
        password:password,
        roll_number:roll,
        CNIC:Cnic,
        dob:dob,
        Address:address,
        Gender:gender,
        Batch:batch,
        guardian_cnic:GCnic,
        phone_number:phone,
        type:true,
        votedFor:null
    }
    //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36"
    //use schema.create to insert data into the db
    user_schema.create(usersdb, function (err, user) {
      if (err){
        
        if(req.header('postman-token')){
        res.status(405).send({status:405,data: null, message: "internal error occured"});
        }
        else res.render("failSignup",{data:'May be You are Entering duplicate Roll Number. Try Entering your Roll Number again.'});
      } 
      else if(user.length==0) res.render("failSignup",{data:'May be You are Entering duplicate Roll Number. Try Entering your Roll Number again.'});//res.status(404).send({status:404,data: null, message: "not found"});
      else { 
        globalstring=roll;
        if(req.header('postman-token')){
        res.status(400).send({status:400,token:globalstring,data: user, message: "found"});}
        else{
       res.redirect('/home');
      }

      }
    });
  }
    
  else   {
    if(req.header('postman-token')){
  
    res.status(401).send({status:401,data: null, message: "field(s) empty"});
    }
    else res.render("failSignup",{data:'field(s) empty'});
    
  }          
   
   
};
module.exports.checklogin1= function(req, res) {
    var sess=req.session;
    console.log(req.body);
    //sess.username=req.body.username;
  if (req.body.email && req.body.pass) {
      usersdb.authenticate(req.body.email, req.body.pass, function(error, user) {
          if(error){ 
            if(req.header('postman-token')){
              res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});}
              else{
                res.render("failLogin",{data:'no user found..'});
            }
            
            //
           console.log(error);
          console.log(user);}
       else if (!user) {
        if(req.header('postman-token')){
          res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
        }
          else{
            res.render("failLogin",{data:'no user found..'});
        }
        
           // 
  
          //sendJSONresponse(res, 401, err);
          //res.render('signin.html');
        } else {
            console.log('user found');
            globalstring=req.body.email;
            if(user.type==false){
              res.redirect('/homeA');
            }
           // res.status(400).send({status:400,token:globalstring,data: user, message: "found"});
           // sess.username=req.body.username;
           // sess.username=req.body.username;
           else {
            res.redirect('/home');
           }
          //sendJSONresponse(res, 200, user);
        }
      });
      
     // res.render('index.html');
    } 
    else {
      if(req.header('postman-token')){
        res.status(401).send({status:401,data: null, message: "field(s) empty"});
      }
        else{
          res.render("failLogin",{data:'field(s) empty'});
      }
       

    }
    
    
   
   
};
module.exports.logout = function(req, res,next) {
    if (req.session) {
      console.log("destroying session " + req.session.userId);
      console.log('done');
      // delete session object
      req.session.destroy();
      res.locals.user = undefined;
      //res.redirect("/");
  
    }
    globalstring="";
   // res.status(403).send({status:403,token:globalstring,data: null, message: "operation successful "});
    res.redirect("/login");


};
//abiha
module.exports.nothing1 = function(req, res) {
    
  res.render("ChangePassword");
};

module.exports.nothing4 = function(req, res) {
    
  res.render("failA");
};

module.exports.nothing3 = function(req, res) {
    
  res.render("ViewProfile");
};
module.exports.nothing2 = function(req, res) {
    
  res.render("Results");
};
module.exports.UpdatePW = function(req, res) {
    //if(!req.body.new_Password)res.status(401).send({status:401,token:globalstring,data: null, message: "field is empty"});
    var pass=req.body.newPassword;
  
    var roll=globalstring;
   console.log("pass"+pass+"   global"+globalstring);
   bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(pass, salt, function(err, hash) {
        pass= hash;
        //newUser.save(callback);
    });
});
                user_schema.updateOne({ roll_number: roll }, { $set: {password: pass}}, function (err, userr) {
                    if (err)
                    {
                      
            if(req.header('postman-token')){
              res.status(405).send({status:405,token:globalstring,data: null, message: "internal/duplicate error occured"});                  //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
            }
          else
          {
              res.render('failA.html', {data:'INternal Error'})
          }
                    }  
                    else if(userr.length==0){
                      
        if(req.header('postman-token')){
          res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});                //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
        }
      else
      {
          res.render('failA.html', {data:'Not Found'})
      }
                    }
                    else{ //res.status(403).send({status:403,token:globalstring,data: userr, message: "success"});
       
                    if(req.header('postman-token')){
                      res.status(403).send({status:403,token:globalstring,data: userr, message: "success"});
                    }
                  else
                  {
                    if(!userr.type){
                      res.redirect('/homeA');
                    }
                    else{res.redirect('/home');}
                    
                  }
                       
                }
                    
                  });
        //}
        //)
    }; 
    
  module.exports.castVote = function(req, res) {
        async.parallel(
          {
            find_cand: function(callback) {
              cand1.find({
              roll_num: req.query.roll_num
              }).exec(callback);
            },
            find_user: function(callback) {
              usersdb.updateOne({ roll_number: globalstring }, { $set: {votedFor: req.query.roll_num}}).exec(callback);
            }
          },
          function(err, results) {
            if (err) {
              
            if(req.header('postman-token')){
              res.status(405).send({status:405,token:globalstring,data: null, message: "internal/duplicate error occured"});                  //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
            }
          else
          {
              res.render('failA.html', {data:'internal Error occured'})
          }
            }
            if (results.find_cand == null) {
              if(req.header('postman-token')){
                res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});                //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
              }
            else
            {
                res.render('failA.html', {data:'Not Found'})
            }
            }
            console.log("req"+req.query.roll_num);

            // Successful, so render.
            console.log('votes:'+results.find_cand);
            
          candidate.updateOne({ roll_num: req.query.roll_num }, { $set: {votes: results.find_cand[0]["votes"]+1}}, function (err, userr) {
             if (err) console.log("err");
             if(req.header('postman-token')){
              res.status(403).send({status:403,token:globalstring,data: userr, message: "success"});
            }
          else
          {
               res.render("Voted");
          }
             //res.status(400).send({status:400,token:globalstring,data: userr, message: "found"});
              })
              
          }
        );
      };
     
module.exports.viewVotes= function(req,res){
	 
	candidate.find({
    }).exec(function(err,candInfo){
      if (err){ 
        if(req.header('postman-token')){
          res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});  
        }
      else
      {
        res.render('failA.html',{data:"Internal error occured"});
      } 
    }
      else if(candInfo.length==0){
      
        if(req.header('postman-token')){
          res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});                //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
        }
      else
      {
          res.render('failA.html', {data:'Not Found'})
      }
      }
      else {
        if(req.header('postman-token')){
          res.status(400).send({status:400,token:globalstring,data:candInfo[0]["votes"], message: "found"});
          //sendJSONresponse(res,200,{code: "400", message:"Votes are rendered"+candInfo[0]["votes"]});
        }
      else
      {
        if(req.header('postman-token')){
        res.status(403).send({status:403,token:globalstring,data: userr, message: "success"});
      }
    else
    {
        res.render('ViewVotes', {candInfo:candInfo });
    }
      }
      }

    });	
};
//fatima
module.exports.del = function(req, res) {
  res.render("deletevoter");
};

module.exports.del2 = function(req, res) {
  res.render("deletecandidate");
};

module.exports.delete_v = function(req, res) {
    var rollnum=req.body.roll;
    
    usersdb.findOneAndDelete({roll_number:rollnum}, function(err, result){
      if (err){
        if(req.header('postman-token')){
              res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
        }
        else{
        res.render("ErrorA",
        {
          data:"Some internal error occured."
        })
      }
    }
        else if(result==null){
            if(req.header('postman-token')){
                  res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
            }
            else{
          res.render("ErrorA",
          {
            data:"Voter not found!"
          })
          }
          }
      else{
          if(req.header('postman-token')){
          res.status(403).send({status:403,token:globalstring,data: result, message: "Operation successful"});
          }
          else{
        res.render("DoneA",
        {
          data:"Voter deleted successfully!"
        })
        }
          
  }
 })
  };

 module.exports.viewProfile_voter = function(req, res) {
   var roll=globalstring;
   
 
    usersdb.findOne({roll_number:roll},function(err,voter,next){
     if (err){
            res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   
     }
            // check to see if theres already a user with that email
     else if (voter) {
      if(req.header('postman-token')){
           res.status(400).send({status:400,token:globalstring,data: voter, message: "found"});    
          }
        else{
      res.render('ViewProfileVoter.html', {
        voter: voter
     });
   }
  }
   else{
    res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
   }
    
 });
 };

 module.exports.profile = function(req, res,next) {
  
  var roll=globalstring;
  usersdb.findOne({roll_number:roll},function(err,voter,next){
   if (err)
          // return done(err);
          res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   
       // check to see if theres already a user with that email
   else if (voter) {
    if(req.header('postman-token')){
         res.status(400).send({status:400,token:globalstring,data: voter, message: "found"});    
        }
   else{
    res.render("UpdateProfileVoter",
{
 voter:voter
}); 
 }
}
 else{
  res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
 }
  
});
};

module.exports.profile2 = function(req, res,next) {

var roll=globalstring;
  usersdb.findOne({roll_number:roll},function(err,admin,next){
   if (err)
          // return done(err);
          res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});   
       // check to see if theres already a user with that email
   else if (admin) {
    if(req.header('postman-token')){
         res.status(400).send({status:400,token:globalstring,data: admin, message: "found"});    
        }
else{
    res.render("UpdateProfileAdmin",
{
 admin:admin
}); 
 }
}
 else{
  res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
 }
});
};

module.exports.updateProfileVoter = function(req, res,next) {
    var roll=globalstring;
    var username = req.body.username.trim();
    var address = req.body.address.trim();
    var cnic = req.body.cnic.trim();
    var phone = req.body.phone.trim();
    var guard = req.body.guard.trim();
    var gender = req.body.gender.trim();
    var dob= req.body.dob.trim();
    usersdb.update({ roll_number: roll }, {
       $set: { username: username ,
       phone_number: phone,
       CNIC: cnic,
       Address: address,
       guardian_cnic:guard,
       Gender:gender,
       DOB: dob
    }}

      , function (err, voter) {
      if (err){
        if(req.header('postman-token')){
          res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
        }
      }
      else if(voter.length==0){
        if(req.header('postman-token')){
          res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
        }
      }
      else{
        if(req.header('postman-token')){
          res.status(403).send({status:403,token:globalstring, data:voter, message: "operation successful"});

         }
        else{
        res.redirect("ViewProfileVoter");
    }
      }
    })
    
  };


  module.exports.updateProfileAdmin = function(req, res,next) {
    var roll=globalstring;
  
    var username = req.body.username.trim();
    var address = req.body.address.trim();
    var cnic = req.body.cnic.trim();
    var phone = req.body.phone.trim();
    var guard = req.body.guard.trim();
    var gender = req.body.gender.trim();
    var dob= req.body.dob.trim();
    usersdb.update({ roll_number: roll }, {
       $set: { username: username ,
       phone_number: phone,
       CNIC: cnic,
       Address: address,
       guardian_cnic:guard,
       Gender:gender,
       DOB: dob
    }}

      , function (err, admin) {

      if (err) 
      {
        if(req.header('postman-token')){
        res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
      }
    }
        else if(admin.length==0)
        {
          if(req.header('postman-token')){
            res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});          
          }
          }
      else{
        if(req.header('postman-token')){
      res.status(403).send({status:403,token:globalstring, data:voter, message: "operation successful"});
    }
    else{
        res.redirect("ViewProfileAdmin");
    }
  }
    })
  };

module.exports.viewProfile_admin = function(req, res) {
     
  var name=globalstring;
     usersdb.findOne({roll_number:name},function(err,admin){
      if (err){
        if(req.header('postman-token')){
          res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"}); 
        }
      }
      else if (admin) {
        if(req.header('postman-token')){
            res.status(400).send({status:400,token:globalstring,data: admin, message: "found"});
          }
          else{
            res.render('ViewProfileAdmin', {
           admin: admin
          });
        }
    }
    else{
      if(req.header('postman-token')){
        res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
      } 
     }
  
  });
  };
module.exports.checkLogin = function requiresLogin(req, res, next) {
    //
    if (req.session && req.session.roll_number) {
      console.log("session active");
      next();
    } else {
      console.log("no session active");
      var err = new Error("You must be logged in to view this page.");
      err.status = 401;
      
      //res.redirect("/");
    }
  };