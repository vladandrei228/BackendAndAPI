require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
let Person;

const Schena  = mongoose.Schema;

const personSchema = new Schena({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var peterParker = new Person({name: "Peter Parker", age: 18, favoriteFoods: ["burgers", "pizza"]});
  peterParker.save((err,data)=>{
    if(err){
      return console.log(err);
    }
  done(null , data);
});
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
      if (err) {
        return console.log(err);
      }
      done(null, data);
    })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err,data)=> {
    if(err){
      return console.log(err);
    }
    done(null , data);
  })
  
};

const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,data)=> {
    if(err)console.log(err);
    done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  findPeopleByName(personName, (err, person)=> {
    if(err) return console.log(err);
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc);
    })
  })
};

const removeById = (personId, done) => {
  findPersonById(personId, (err, person)=> {
    if(err) return console.log(err);
    Person.findByIdAndRemove(personId, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    })})
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, res) => {
    if(err) return console.log(err);
    done(null, res);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
    
  if(err) return console.log(err);
  done(null, data);
});};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
