var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/restmycodeDB";

//mongodb://heroku_gb6159f8:<dbpassword>@ds129459.mlab.com:29459/heroku_gb6159f8";


const Data = require('../Schemas/Data');
// const User = require('../Schemas/User');
// const Comment = require ('../Schemas/Comment');

mongoose.connect(db, {useNewUrlParser: true}).then(() => {
    console.log('Database is connected')
},
err => {
    console.log('Can not connect to the database' + err)
});

router.get('/', function (req, res, next) {
    Data.find().sort({title: 'asc'}).exec(function (err, data) {
        return res.json(data);
    });
});

/*
router.post('/filter', function (req, res, next) {
    var myQuery = {};
    var arr = [];
    if (req.body.tags !== undefined) {
        var keywords = req.body.tags.split(" ");
        for (i = 0; i < keywords.length; i++) {
            arr.push({tags: new RegExp(keywords[i], "i")});
            arr.push({title: new RegExp(keywords[i], "i")});
            arr.push({descript: new RegExp(keywords[i], "i")});
        }
        myQuery.$or = arr;
    }
    console.log(myQuery);

    if (req.body.lang !== undefined) myQuery.lang =req.body.lang;
    if (req.body.author !== undefined) myQuery.author =new RegExp(req.body.author,"i");
    console.log(myQuery);
    Data.find(myQuery).sort({title: 'asc'}).exec(function (err, data) {
        // console.log(data);
        if (data.length < 1) {
            res.status(404).send('unable to save the course into database');
        }
        else {
            console.log("Moro");
            res.render('listing.ejs', {data: data, title: "RestMyCode_2.0"}, function (err, html) {
                console.log("Moro taas");
                res.send(html);
            });
        }
    });
});

//
// //TODO sort by date ascending
// router.get('/dateasc', function (req, res, next) {
//     Data.find().sort({date: 'asc'}).exec(function (err, data) {
//         // console.log(data);
//         res.render('listing.ejs', {data: data, title: "RestMyCode_2.0"});
//     });
// });
//
// //TODO sort by date descending
// router.get('/datedesc', function (req, res, next) {
//     Data.find().sort({date: -1}).exec(function (err, data) {
//         // console.log(data);
//         res.render('listing.ejs', {data: data, title: "RestMyCode_2.0"});
//     });
// });
*/
//
// router.get('/:id', function (req, res) {
//     Data.findById(req.params.id, function (err, data) {
//         res.json(data);
//     });
// });
//
// router.get('/comment/:id', function (req, res) {
//     Comment.find({dataId : req.params.id}).sort({}).exec(function (err, data) {
//         console.log(data);
//         res.json(data);
//     });
//
//     // Comment.find({dataId : req.params.id}).toArray().then((result) => {
//     //     console.log(res);
//     //     res.json(result);
//     // })
// });
//
// router.get('/score', function (req, res) {
//     Data.find(req.params.score, function (err, data) {
//         res.json(data);
//     });
// });
//
//
// router.post('/', (req, res) => {
//     const user = new User(req.body);
// user.save()
//     .then(user => {
//     res.status(200).redirect("/");
// })
// .catch(err => {
//     res.status(400).send('unable to save the course into database');
// });
// });
//
// router.post('/voteup/:id', (req, res) => {
//     Data.findById(req.params.id, function(err, data) {
//     if (err)
//         return next(new Error('Could not vote'));
//     else {
//         data.score = data.score +1 ;
//         console.log("Muutokset hoidettu");
//         data.save(function(err,upodate) {
//             console.log(err);
//             console.log(upodate);
//             if (err) res.status(400).send("unable to update the score");
//             res.redirect("/read/" + req.params.id);
//         });
//     }
// });
// });
//
// router.post('/votedown/:id', (req, res) => {
//     Data.findById(req.params.id, function(err, data) {
//     if (err)
//         return next(new Error('Could not vote'));
//     else {
//         data.score = data.score -1 ;
//         console.log("Muutokset hoidettu");
//         data.save(function(err,upodate) {
//             console.log(err);
//             console.log(upodate);
//             if (err) res.status(400).send("unable to update the score");
//             res.redirect("/read/" + req.params.id);
//         });
//     }
// });
// });
//
router.post('/data', (req, res) => {
    var tags = req.body.tags.toString().split(',');
const data = new Data({
    title: req.body.title,
    descript: req.body.descript,
    lang: req.body.lang,
    code: req.body.code,
    author: req.body.author,
    tags: tags
});
data.save()
    .then(data => {
    res.status(200).redirect("/users");
})
.catch(err => {
    res.status(400).send('unable to save the data into database');
});
});
//
// //TODO tällä hetkellä tarkistaa onko kayttäjä, jos on ei lisää, ellei -> lisää
// router.post('/signup', (req, res) => {
//     // var id = mongoose.Types.ObjectId();
//     // const data = new User({_id: id, name: req.body.name, password: req.body.password});
//     const data = new User(req.body);
// function resolver(count) {
//     if (count > 0) {
//         console.log('Username exists.');
//         res.redirect("/login");
//         //TODO ilmoita käyttäjälle
//     } else {
//         //TODO ilmoita käyttäjälle ja kirjaudu sisään -> olet taalla
//         console.log('Username and password added successfully!');
//         data.save()
//             .then(data => {
//             res.status(200).redirect("/login");
//     })
//     .catch(err => {
//             res.status(400).send('unable to save the user into database');
//     });
//     }
// }
// User.count({name: req.body.name}).then(resolver);
// });
//
// router.post('/signin', (req, res) => {
//     // const data = new User(req.body);
//     function resolver(count) {
//     if (count > 0) {
//         console.log('Logged in successfully!');
//         res.redirect("/login");
//         //TODO olet kirjautunut
//     } else {
//         console.log('Username or password incorrect!');
//         //TODO et ole kirjautunut
//         res.redirect("/login");
//     }
// }
//
// User.count({name: req.body.name, password: req.body.password}).then(resolver);
// });
//
// router.post('/comment', (req, res) => {
//     var id = req.body.dataId;
// console.log(req.body.dataId);
// const comment = new Comment(req.body);
// comment.save()
//     .then(data => {
//     res.status(200).redirect("/read/" + id);
// })
// .catch(err => {
//     console.log("Error 400");
// res.status(400).send('unable to save the comment into database').redirect("/read/" + id);
// });
//
// });
//
// // {"userId":"5b6991df4315dc21ac3e13e1","title":"Syuuuggyhgjhing","descript":"String","lang":"String","tags":["jotain1", "jotain2"],"score": 2,"code":"String","comments":[{"author":"5b6995401e4ba7ae48fe6495", "comment":"Schaqize"},{"author":"5b6995401e4ba7ae48fe6495", "comment":"Schaqize"}]}
//
// //TODO kaikki muokkauskentät auki, mutta vanhoilla arvoilla täytettyinä
// router.route('/update/data/:id').post(function (req, res) {
//     Data.findById(req.params.id, function (err, data) {
//         if (err)
//             return next(new Error('Could not load Document'));
//         else {
//             data.title = req.body.title;
//             data.descript = req.body.descript;
//             data.lang = req.body.lang;
//             data.code = req.body.code;
//             data.author = req.body.author;
//             data.tags = req.body.tags;
//             console.log(data);
//             console.log("Muutokset hoidettu");
//             data.save(function (err, upodate) {
//                 if (err) res.status(400).send("unable to update the database");
//                 res.redirect("/users");
//             });
//         }
//     });
// });
//
router.route('/deletedata/:id').delete(function (req, res) {
    Data.findByIdAndRemove({_id: req.params.id}, function (err, deleted) {
        console.log("err: " + err);
        console.log("course: " + deleted);
        console.log(deleted === null);
        if (deleted === null) res.status(404).send("Unable to remove, not found");
        else res.json('Successfully removed');
    });
});
//
// router.route('/deleteuser/:id').delete(function (req, res) {
//     User.findByIdAndRemove({_id: req.params.id}, function (err, user) {
//         console.log(err != null);
//         if (err != null) res.status(404).send("Unable to remove, not found");
//         else res.json('Successfully removed');
//     });
// });



module.exports = router;
