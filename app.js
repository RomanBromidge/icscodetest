"use strict";

var express = require('express'),
    app = express(),
    helmet = require('helmet'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    mw = require('./middleware');

var indexRoutes = require('./routes/index');

var banned = [];
banUpperCase("./public/", "");
// Define the sequence of functions to be called for each request
app.use(helmet());
app.use(require('sanitize').middleware);
app.use(ban);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



//Connect to port then listen
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
    console.log('Visit: http://localhost:8080');
}
app.listen(port);
//ROUTES
app.use('/', indexRoutes);

//Any other routes that are unnaccounted for
app.get('*', function(req, res) {
    res.set({ 'Content-Type': 'application/xhtml+xml; charset=utf-8' });
    res.status(404).render("notfound");
});

//----------------------------------------------------------------------------//
// FUNCTIONS
//----------------------------------------------------------------------------//

// Forbid access to the URLs in the banned list.
function ban(req, res, next) {
    for (var i = 0; i < banned.length; i++) {
        var b = banned[i];
        if (req.url.startsWith(b)) {
            res.status(404).send("Filename not lower case");
            return;
        }
    }
    next();
}
// Ban files/subfolders with non-lowercase names.
function banUpperCase(root, folder) {
    var folderBit = 1 << 14;
    var names = fs.readdirSync(root + folder);
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var file = folder + "/" + name;
        if (name != name.toLowerCase()) banned.push(file.toLowerCase());
        var mode = fs.statSync(root + file).mode;
        if ((mode & folderBit) == 0) continue;
        banUpperCase(root, file);
    }
}
