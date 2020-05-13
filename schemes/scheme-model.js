const db = require("../data/dbConfig");

module.exports={
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db("schemes")
}

function findById(id) {
    return db("schemes")
             .where({ id: id })
             .first()
}

function findSteps(schemeId) {
    return db("steps")
             .join("schemes", "schemes.id", "=", "steps.scheme_id")
             .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
             .where({ "steps.scheme_id": schemeId })
             .orderBy("steps.step_number")
}

function add(scheme) {
    return db("schemes")
             .insert(scheme, 'id')
             .then(([id]) => {
                 return findById(id)
             })
}

function update(changes, id) {
    return db("schemes")
             .where({ id: id })
             .update(changes)
             .then(count => {
                 return findById(id)
             })
}

function remove(id) {
    return findById(id)
                   .then(scheme => {
                       return(db("schemes")
                         .where({ id: id })
                         .del()
                         .then(count => {
                           return scheme
                         }))                   
                   })       
}