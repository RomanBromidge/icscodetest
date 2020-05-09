"use strict";
//MIDDLEWARE FOR ALL ROUTES
var middlewareObj = {};

//Define functions like this, they can then be used anywhere in the app!
middlewareObj.hello_world = function() {
  console.log("Hello world!");
  return;
}

module.exports = middlewareObj;
