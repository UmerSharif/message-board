const db = require('./connection')

const messages = db.get('messages')

function getAll(){
    return messages.find()
}

function create(message){
    return messages.insert(message)
}

module.exports = {
    getAll,
    create
}