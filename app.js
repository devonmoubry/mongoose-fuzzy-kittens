const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/mongoose-fuzzy-kitten');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected');
});

var kittySchema = mongoose.Schema({
    name: String
});

console.log('kittySchema', kittySchema);

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

console.log('Kitten', Kitten);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

var whiskers = new Kitten ({ name: 'whiskers' });
whiskers.speak();

var mrKitters = new Kitten ({ name: 'mr. kitters' });
mrKitters.speak();

var garfield = new Kitten ({ name: 'garfield' });
garfield.speak();

console.log('what is fluffy? ', fluffy);

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

whiskers.save((err, whiskers) => {
  if (err) return console.error(err);
  whiskers.speak();
})

mrKitters.save((err, mrKitters) => {
  if (err) return console.error(err);
  mrKitters.speak();
})

garfield.save((err, garfield) => {
  if (err) return console.error(err);
  garfield.speak();
})

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})