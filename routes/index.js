var crypto= require('crypto');
module.exports = function(app) {
    app.get('/index', function(req, res,next) {
        console.log(123);
        res.render('index', {
            title: '发布工具首页',
            layout:'layout.ejs'
        });
    });
    app.get('/', function(req, res,next) {
        console.log(123);
        res.render('index', {
            title: 'sss',
            layout:'layout.ejs'
        });
    });
    app.get('/cssFileTrack', function(req, res,next) {
        console.log(222);
        res.render('reg', {
        title: '生成CSS文件引用',
        layout:'layout.ejs'
        });
    });
};


/*
 * GET home page.
 */
/*

exports.index = function(req, res){
  res.render('index', { title: 'Express',layout:'layout.ejs'});
};
exports.user = function(req, res){
 res.render();
};

exports.post = function(req, res){

};
exports.reg = function(req, res){

};
exports.doReg = function(req, res){

};
exports.login = function(req, res){

};
exports.doLogin = function(req, res){

};

exports.logout = function(req, res){

};*/
