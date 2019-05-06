const express = require("express");
const router = express.Router();

const methodOverride = require('method-override');

var ctrlCandidates = require("../controllers/cand_list");
var ctrlusers = require("../controllers/user_controls");
var renderCtrls=require("../controllers/render_controls");


/*
router.get("/voter/homepage",function(req,res,next){
	console.log("session"+req.session);
	if (req.session && req.session.roll_number) {
		
		console.log("session active");
		next();
	  } else {
		console.log("no session active");
		var err = new Error("You must be logged in to view this page.");
		err.status = 401;
	  }
	  
		
});
*/
router.post("/signup",ctrlusers.addNewUser);//done
router.get("/signup",renderCtrls.rendersignup);//done
router.post("/login1",ctrlusers.checklogin1);//done 
router.get("/login",renderCtrls.renderlogin);//done 
router.get("/signout",ctrlusers.logout);// done


router.get("/home",ctrlCandidates.getCandidateList);//done
router.get("/voter_search_Candidate", ctrlCandidates.searchCandidateList);//done 
router.get("/voter_deactivate_account", ctrlusers.deactivateA);//on success and fail done 
//router.get("/voter_view_candidate_list", ctrlCandidates.getCandidateList);
router.get("/voter_view_candidate_list_filter", ctrlCandidates.filter_by_batch);// done
router.get("/searchV", renderCtrls.renderSearch);//done

//make a search page with radio buttons with differend options for search
router.get("/admin_searchvoterUname", ctrlusers.searchuserUname); //done
router.get("/admin_searchvoterRoll", ctrlusers.searchuserRoll);//done
router.get("/admin_search_Candidate", ctrlCandidates.searchCandidateList1);//done

router.get("/homeA", ctrlCandidates.getCandidateList1); //done
//router.get("/admin_view_candidate_list", ctrlCandidates.getCandidateList);
router.post("/admin_add_admin", ctrlusers.addAdmin);//done
router.get("/addAdmin", renderCtrls.adminpg);//done
router.get("/admin_view_candidate_list_filter", ctrlCandidates.filter_by_batch2);//done
router.delete("/admin_deactivate_account", ctrlusers.deactivateA);//done


//abiha routes

//complete

router.get("/Results", ctrlCandidates.Results2);

router.get("/addCandidate", ctrlCandidates.nothing);
router.post("/addCandidate", ctrlCandidates.creating);

router.get("/ChangePassword",ctrlusers.nothing1);

router.put("/ChangePassword",ctrlusers.UpdatePW);//with profile
router.put("/ChangePassword?_method=put", ctrlusers.UpdatePW)
//router.get("/ViewProfile",ctrlusers.nothing3 )

router.get("/ViewVotes",ctrlusers.viewVotes);

router.get("/candidate", ctrlCandidates.viewCandidate);

router.get("/CastVote", ctrlCandidates.filter_by_batch1); 

router.put("/admin_changePassword",ctrlusers.UpdatePW);
router.get("/Voted",ctrlusers.castVote);
router.get("/failA.html",ctrlusers.nothing4);
///router.get("/voteCast",renderCtrls.renderCast)

//fatima routes



router.get("/deletevoter", ctrlusers.del);
router.delete("/deletevoter", ctrlusers.delete_v);
router.delete("/deletevoter?_method=delete", ctrlusers.delete_v);

router.get("/deletecandidate", ctrlusers.del2);
router.delete("/deletecandidate", ctrlCandidates.delete_c);
router.delete("/deletecandidate?_method=delete", ctrlCandidates.delete_c);

router.get("/ViewProfileVoter", ctrlusers.viewProfile_voter);
router.get("/UpdateProfileVoter", ctrlusers.profile);
router.put("/UpdateProfileVoter", ctrlusers.updateProfileVoter);
router.put("/UpdateProfileVoter?_method=put", ctrlusers.updateProfileVoter);


router.get("/ViewProfileAdmin", ctrlusers.viewProfile_admin);
router.get("/UpdateProfileAdmin", ctrlusers.profile2);
router.put("/UpdateProfileAdmin", ctrlusers.updateProfileAdmin);
router.put("/UpdateProfileAdmin?_method=put", ctrlusers.updateProfileAdmin);






//router.post("/pop.html", ctrlLocations1.savePop);
//const movie=require('../models/showtimedb');;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//passport

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

















        

module.exports = router;
