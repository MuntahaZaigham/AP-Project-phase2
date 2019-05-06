var express = require('express');
var cors = require('cors');
var mongo = require('mongodb');
var mongoose=require('mongoose');
var candidate = mongoose.model("candidate1");
var usersdb= mongoose.model("usersdb");

var path = require("path");
function cleanInt(x) {
    x = Number(x);
    return x >= 0 ? Math.floor(x) : Math.ceil(x);
}
module.exports.gt=function(req,res){
    res.render("ViewProfile.html")
}


module.exports.getCandidateList = function(req, res) {
    
    
    //send json response
    candidate.find({},'username batch roll_num',function(err,result){
        if (err) throw err;
        else if(result.length==0){res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});}
        else{ 
            //res.status(400).send({status:400,token:globalstring,data: result, message: "found"}); 
           // res.json(result);
            res.render("home.html",{data:result});
        }
    });


    
};
module.exports.getCandidateList1 = function(req, res) {

    //send json response
    candidate.find({},'username batch roll_num',function(err,result){
        if (err) throw err;
        else if(result.length==0){res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});}
        else{ 
            //res.status(400).send({status:400,token:globalstring,data: result, message: "found"}); 
           // res.json(result);
            res.render("homeAdmin",{data:result});
        }
    });

    
    
};
module.exports.searchCandidateList = function(req, res) {
    var query1=req.query.search;
    console.log(query1);
    /*
    if(query==null){
        
       // res.status(401).send({status:401,data: null, message: "field(s) empty"});
    }
    */

    //send json response
    candidate.find({roll_num: query1}).exec(function(err,result){
        if (err){
            if(req.header('postman-token')){
                res.status(405).send({status:405,data: null, message: "Internal Error occured"});
              }
                else{
                    res.render("failHome",{data:'Some Internal Error Occured'});
              }
            
        } //throw err;//
        else if(result.length==0){
            if(req.header('postman-token')){
                
                res.status(404).send({status:404,data: null, message: "not found"});
              }
                else{
                   
                    res.render("failHome",{data:'found no Candidate against your query!!'});
                
              }
            }
        //
        else{ 
            
           // res.status(400).send({status:400,data: result, message: "found"});
            console.log(result)
           res.render("candidate",{data:result});
        }
    });

    
    
};
module.exports.searchCandidateList1 = function(req, res) {
    var query1=req.query.search;
    console.log(query1);
    /*
    if(query==null){
        
       // res.status(401).send({status:401,data: null, message: "field(s) empty"});
    }
    */

    //send json response
    candidate.find({roll_num: query1}).exec(function(err,result){
        if (err){
            if(req.header('postman-token')){
                
                res.status(405).send({status:405,data: null, message: "Internal Error occured"});
              }
                else{
                   
                    res.render("failSearch",{data:'Some Internal Error Occured'});
                
              }
            
        } //throw err;//
        else if(result.length==0){
            if(req.header('postman-token')){
                
                res.status(404).send({status:404,data: null, message: "not found"});
              }
                else{
                   
                    res.render("failSearch",{data:'found no Candidate against your query!!'});
                
              }
            
        }
        //
        else{ 
            
           // res.status(400).send({status:400,data: result, message: "found"});
            console.log(result)
           res.render("candidate",{data:result});
        }
    });

    
    
};
module.exports.filter_by_batch = function(req, res) {
    //check user's batch 
    
    var roll=globalstring;
    console.log('jsdhjksad');
    console.log(globalstring);
    console.log('jsdhjksad');
    console.log(roll);
    var batch1;
    var b;
    usersdb.find({roll_number:roll},{Batch:1, _id:0},function(err,result){
        if (err) {
            if(req.header('postman-token')){
                
                res.status(405).send({status:405,data: null, message: "Internal Error occured"});
              }
                else{
                   
                    res.render("failHome",{data:'Some Internal Error Occured'});
                
              }
        }
        
        else if(!result){
            if(req.header('postman-token')){
                
                  
                res.status(404).send({status:404,data: null, message: "not found"});
              }
                else{
                   
                    res.render("failHome",{data:'You need to login!!'});
                
              }
            
        }
        else{
            console.log('results '+result);
            batch1=JSON.stringify(result).slice(10,12);
            console.log('batch1 '+(batch1));
             b=Number(batch1);
             console.log(b)
             candidate.find({batch:b},function(err,result){
                if (err){
                    if(req.header('postman-token')){
                
                        res.status(405).send({status:405,data: null, message: "Internal Error occured"});
                      }
                        else{
                           
                            res.render("failHome",{data:'Some Internal Error Occured'});
                        
                      }
                } //res.render("failHome",{data:'Some Internal Error Occured'});//res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
                else if(result.length==0){ 
                    if(req.header('postman-token')){
                
                        res.status(404).send({status:404,data: null, message: "not found"});
                      }
                        else{
                           
                            res.render("failHome",{data:'Not found any Candidate against your batch!'});
                        
                      }
                    //res.render("failHome",{data:''});
                   //res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
                }

                else{  
                    //res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
                    res.render("filtered",{data:result});

                }
        
        
            });
        }
    });
    
   
    //console.log(typeof(b));
    

    

    
    
};
module.exports.filter_by_batch2 = function(req, res) {
    //check user's batch 
    
    var roll=globalstring;
    console.log('jsdhjksad');
    console.log(globalstring);
    console.log('jsdhjksad');
    console.log(roll);
    var batch1;
    var b;
    usersdb.find({roll_number:roll},{Batch:1, _id:0},function(err,result){
        if (err) {
            if(req.header('postman-token')){
                
                res.status(405).send({status:405,data: null, message: "Internal Error occured"});
              }
                else{
                   
                    res.render("failAdminH",{data:'Some Internal Error Occured'});
                
              }
        }
        
        else if(!result){
            if(req.header('postman-token')){
                
                  
                res.status(404).send({status:404,data: null, message: "not found"});
              }
                else{
                   
                    res.render("failAdminH",{data:'You need to login!!'});
                
              }
            
        }
        else{
            console.log('results '+result);
            batch1=JSON.stringify(result).slice(10,12);
            console.log('batch1 '+(batch1));
             b=Number(batch1);
             console.log(b)
             candidate.find({batch:b},function(err,result){
                if (err){
                    if(req.header('postman-token')){
                
                        res.status(405).send({status:405,data: null, message: "Internal Error occured"});
                      }
                        else{
                           
                            res.render("failAdminH",{data:'Some Internal Error Occured'});
                        
                      }
                } //res.render("failHome",{data:'Some Internal Error Occured'});//res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
                else if(result.length==0){ 
                    if(req.header('postman-token')){
                
                        res.status(404).send({status:404,data: null, message: "not found"});
                      }
                        else{
                           
                            res.render("failAdminH",{data:'Not found any Candidate against your batch!'});
                        
                      }
                    //res.render("failHome",{data:''});
                   //res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
                }

                else{  
                    //res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
                    res.render("filtered",{data:result});

                }
        
        
            });
        }
    });
    
   
    //console.log(typeof(b));
    

    

    
    
};
//abiha
module.exports.filter_by_batch1 = function(req, res) {
    //check user's batch 
    var roll=globalstring;
    var batch1;
    var b;
    usersdb.find({roll_number:roll},{_id:0, Batch:1, votedFor:1},function(err,result){
        if (err) {
            if(req.header('postman-token')){
              res.status(404).send({status:405,token:globalstring,data: null, message: "Internal Error"});                //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
            }
          else
          {
              res.render('failA.html', {data:'Internal Error'})
          }}
        else if(result==null){
            if(req.header('postman-token')){
            res.status(400).send({status:400,token:globalstring,data: null, message: "not found"});
            //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
          }
        else
        {
            res.render('failA.html', {data:'User not found'})
        }
        //res.status(405).send({status:405,token:globalstring,data: null, message: "internal/duplicate error occured"});        
    }
        
        else if(JSON.stringify(result).slice(24,25) != 'n'){
            console.log(JSON.stringify(result).slice(24,25)+result);
            if(req.header('postman-token')){
                res.status(403).send({status:406,token:globalstring,data: null, message: "No result"});
              }
            else
            {
            res.render("CastVote1");
            }
        }
        else{
            console.log('results '+result);
            batch1=JSON.stringify(result).slice(10,12);
            console.log('batch1 '+typeof(batch1));
             b=Number(batch1);
             console.log('batch1'+b);
             candidate.find({batch:b},function(err,result){

                if (err)
                {
                 
            if(req.header('postman-token')){
                res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
            }
            else
            {
                res.render('failA.html', {data:'RollNumber  already exists'})
            }   
                }
                else if(result.length==0){ 
                    if(req.header('postman-token')){
                      res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});                //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
                    }
                  else
                  {
                      res.render('failA.html', {data:'Not Found'})
                  }
                }

                else{  
                    //res.status(400).send({status:400,token:globalstring,data: result, message: "found"});
                    //console.log(result);
                    if(req.header('postman-token')){
                        res.status(403).send({status:403,token:globalstring,data: result, message: "success"});
                      }
                    else
                    {
                    res.render("CastVote",{data:result});
                    }
                }
            });
        }
    });    
};
module.exports.creating = function(req, res) {
    //console.log("--req.body--"+ req.body);
    if (req.body.username && req.body.Batch && req.body.RollNumber) {
        var canddb ={
          Skills : req.body.skills,
          Experience: req.body.experience,
          username: req.body.username,
          password: req.body.password,
          batch: req.body.Batch,
          roll_num:req.body.RollNumber,
          school:req.body.school,
          College:req.body.college,
          votes:0
        }
    
        //use schema.create to insert data into the db
        candidate.create(canddb, function (err, candidate) {
          if (err){
            if(req.header('postman-token')){
                res.status(405).send({status:405,token:globalstring,data: null, message: "internal/duplicate error occured"});                  //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
              }
            else
            {
                res.render('failA.html', {data:'Internal/ Duplicate error'})
            }
            //res.status(405).send({status:405,token:globalstring,data: null, message: "internal/duplicate error occured"});        
          } 
          else if(!canddb){ 
              if (err){
            if(req.header('postman-token')){
                res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
                //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
              }
            else
            {
                res.render('failA.html', {data:'Not Found'})
            }
            //res.status(405).send({status:405,token:globalstring,data: null, message: "internal/duplicate error occured"});        
          } 
}
          else { 
            globalstring=req.body.RollNumber;
           // res.json(candidate);
            //res.redirect('/');
            //res.status(400).send({status:400,token:globalstring,data: candidate, message: "found"});
            console.log(JSON.stringify(req.headers));
                if(req.header('postman-token')){
                    res.status(403).send({status:403,token:globalstring,data: null, message: "success"});
                  }
                else
                {
                res.redirect('/home');
                
            }
          }
        });
      }
    };
    module.exports.viewCandidate = function(req, res) {
     
        var user=req.query.roll_num;
        console.log(req.query);
        if(req.params==null){
            if(req.header('postman-token')){
                res.status(401).send({status:401,token:globalstring,data: null, message: "field(s) empty"});
            }
          else
          {
              res.render('failA.html', {data:'No selected argument'})
          }
        }
        candidate.find({
          roll_num: user
    
        }).exec(function(err,candInfo){
            if(err)
            {
                
            if(req.header('postman-token')){
                res.status(405).send({status:405,token:globalstring,data: null, message: "internal/duplicate error occured"});                  //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
              }
            else
            {
                res.render('failA.html', {data:'Internal Error'})
            }
            }

          else if (candInfo.length==0) {
            if(req.header('postman-token')){
              res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});                //sendJSONresponse(res,200,{code: "400", message:"Votes are sent"});
            }
          else
          {
              res.render('failA.html', {data:'Not Found'})
          }
          }
          else {
            //console.log(payment);
            //console.log(payment1);
            //res.status(400).send({status:400,token:globalstring,data: candInfo, message: "found"});
          //res.json(candInfo);
          if(req.header('postman-token')){
                      res.status(403).send({status:403,token:globalstring,data: candInfo, message: "success"});
                    }
                  else
                  {
            res.render("candidate", { data: candInfo });
                  }
          }
    
        });			
      };
      
module.exports.Results2= function(req,res){
	
	candidate.aggregate(
		[
			{
				$group:
				{
					_id:"$batch",
					maxVotes:{$max: "$votes"}	
				}
			}
		]
		).exec(function(err,maxV){
            console.log(maxV);
            if(req.header('postman-token')){
                res.status(403).send({status:403,token:globalstring,data: maxV, message: "success"});
              }
            else
            {
            res.render('Results', {data: maxV});
            }
		})
		
}	
	
	
    module.exports.Results1= function(req,res){
    var result;
    console.log("rel[0]['roll_num']");
        candidate.aggregate(
            [
                {
                    $group:
                    {
                        _id:"$batch",
                        maxVotes:{$max: "$votes"}	
                    }
                }
            ]
            ).exec(function(err,maxV){
                //res.status(400).send({status:400,token:globalstring,data: maxV, message: "found"}); 
                
              if(maxV.length==0)res.status(404).send({status:404,token:globalstring,data: null, message: "not found"});
                  candidate.find({
                        
                        $and:[
                            { votes: maxV[0]["maxVotes"]},
                            {batch:maxV[0]["_id"]}
                        
                        ]},function(err,rel){
                        if(err)throw err;
                        else{
                            //res.status(400).send({status:400,token:globalstring,data: rel[0]['roll_num'], message: "found"}); 
                        //console.log(rel[0]['roll_num']);
                        }
                    });
                    candidate.find( 
                        {
                        
                            $and:[
                                { votes: maxV[1]["maxVotes"]},
                                {batch:maxV[1]["_id"]}
                            
                            ]},function(err,rel){
                        if(err)throw err;
                        else{
                          //  console.log(maxV[1]["maxVotes"]);
                          //res.status(400).send({status:400,token:globalstring,data: rel, message: "found"}); 
                        }
                    })
                    candidate.find( 
                        {
                        
                            $and:[
                                { votes: maxV[2]["maxVotes"]},
                                {batch:maxV[2]["_id"]}
                            
                            ]},function(err,rel){
                        if(err)throw err;
                        else{
                          //  console.log(maxV[1]["maxVotes"]);
                          //res.status(400).send({status:400,token:globalstring,data: rel, message: "found"}); 
                        }
                    })
                    console.log("maxVotes"+ maxV);
                    if(req.header('postman-token')){
                        res.status(403).send({status:403,token:globalstring,data: userr, message: "success"});
                      }
                    else
                    {
                    res.render('Results', {data: maxV});
                    }
            });
           
        };
        module.exports.nothing = function(req, res) {
    
            res.render("addCandidate");
        };
//fatima
module.exports.delete_c = function(req, res) {
    var rollnum=req.body.roll;
  candidate.findOneAndDelete({roll_num:rollnum}, function(err, result){
    if (err){
        if(req.header('postman-token')){
            res.status(405).send({status:405,token:globalstring,data: null, message: "internal error occured"});
      }
      else{
        res.render("ErrorB",
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
        res.render("ErrorB",
        {
          data:"Candidate not found!"
        })
      }
    }
    else{
        if(req.header('postman-token')){
       res.status(403).send({status:403,token:globalstring,data: result, message: "operation successful"});
    }
else{
    res.render("DoneA",
    {data:"Candidate deleted successful"}
    )} 
}     
});
        };