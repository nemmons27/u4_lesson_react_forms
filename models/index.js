const mongoose = require('mongoose')
const issueSchema = require('./issue')

const Issue = mongoose.model('Issue', issueSchema)

module.exports = {
  Issue
}
