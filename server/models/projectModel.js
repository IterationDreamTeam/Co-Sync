const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema({
  taskName: { type: String, required: true },
  taskPriority: {type: String},
  taskComments: { type: [String] },
  deadlineDate: {type: String}
}, {timestamps: true})

const columnSchema = new Schema({
  columnName: { type: String, required: true },
  tasks: [taskSchema]
})

/**Since we cannot create tasks or columns without first creating a project, we can instead have those schemas be a part of the overarching
 * project model. So the tasks would be within the lists, then the lists would be within the project
  */

const projectSchema = new Schema({
  projectName: { type: String, required: true },
  columns: [columnSchema], 
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'Collaboration' }]
})

module.exports = mongoose.model('Project', projectSchema);
