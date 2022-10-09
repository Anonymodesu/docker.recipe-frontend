var person = {
    name: "Brendan Eich",
    hello: function (thing) {
        console.log(this.name + " says hello " + thing);
    }
}

var bind = function (func, thisValue) {
    return function () {
        return func.apply(thisValue, arguments);
    }
}

function printArgs() {
    console.log(arguments)
}

var boundHello = bind(person.hello, person);
boundHello("blah", "foobar") // "Brendan Eich says hello world"

printArgs("flying", "poo")