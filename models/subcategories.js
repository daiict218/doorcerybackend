const mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate'),
  Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: {
    type: String
  },
  category_id: {
    type: String
  },
  item_ids: [{
    type: String
  }]
});

subCategorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('subcategories', subCategorySchema);
