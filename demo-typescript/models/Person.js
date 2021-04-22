"use strict";
exports.__esModule = true;
exports.Person = void 0;
var Person = /** @class */ (function () {
    function Person(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    Person.prototype.displayName = function () {
        return "Hello " + this.firstName + ", " + this.lastName + " - age : " + this.age;
    };
    return Person;
}());
exports.Person = Person;
