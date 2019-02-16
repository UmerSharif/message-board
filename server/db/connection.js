const monk = require('monk')
const connectionString = 'mongodb://umer:umer4167@ds135255.mlab.com:35255/messageforum'
// process.evn.MONGODB_URI || 'localhost/messageboard'
const db = monk(connectionString)

module.exports = db