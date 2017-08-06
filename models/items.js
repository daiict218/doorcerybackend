const mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate'),
  Schema = mongoose.Schema;

const itemSchema = new Schema({
  subcategory_id: {
    type: String
  },
  name: {
    type: String
  },
  image: {
    type: String
  },
  quantity: {
    type: Number
  },
  unit: {
    type: String
  }
});

itemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('items', itemSchema);
