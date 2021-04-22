"use strict";
exports.__esModule = true;
var Person_1 = require("./models/Person");
var fabien = new Person_1.Person("Fabien", "grignoux", 39);
var phrase = fabien.displayName();
console.log(phrase);
