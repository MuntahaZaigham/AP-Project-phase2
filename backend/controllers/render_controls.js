module.exports.renderlogin= function(req, res) {
          
          res.render("login");
};
module.exports.rendersignup= function(req, res) {
          
    res.render("signup");
};
module.exports.adminpg= function(req, res) {
          
    res.render("addAdmin",{data:null});
};
module.exports.renderSearch= function(req, res) {
          
    res.render("searchv");
};
module.exports.renderCast= function(req, res) {
          
    res.render("CastVote");
};