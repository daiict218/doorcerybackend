const mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate'),
  Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String
  },
  subcategory_ids: [{
    type: String
  }]
});

categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('categories', categorySchema);
