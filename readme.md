#Thrive

Thrive is a utility class that provides out of the box inheritance, proxy/curry for event scope, and easily passing in params.


##Example

```javascript
var SomeClass = Thrive.extend({
	init: function() {
		console.log(this.debug); //true
	},
	setDebug: function(debug) {
		this.debug = debug;
	}
});

var someClass = new SomeClass({ debug: true });
someclass.setDebug(true);
```

##Inheritance

```javascript
var AnotherClass = SomeClass.extend({
	setDebug: function(debug) {
		SomeClass.prototype.setDebug.call(this, debug);
		//do something else
	}
});
var anotherClass = new AnotherClass({ debug: false });
anotherClass.setDebug(true);
```

##Proxy/Curry
```javascript
var SomeClass = Thrive.extend({
	init: function() {
		setTimeout(this.proxy(this.method, '123'), 100);
	},
	method: function(arg) {
		console.log(arg); //123
	}
});
```

##Install

<!--Browser: [Development]() | [Production]()-->

Node.js: `npm install thrive`
