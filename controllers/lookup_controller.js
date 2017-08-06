const _ = require('lodash');

const Category = require('../models/categories');
const SubCategory = require('../models/subcategories');
const Items = require('../models/items');

const entityTypes = {
  'Category': {
    type: 'category',
    model: Category
  },
  'SubCategory': {
    type: 'subcategory',
    model: SubCategory
  },
  'Items': {
    type: 'items',
    model: Items
  }
};

exports.dimensionLookUp = function(req, res, next){
  const lookupType = _.get(req, 'body.dimensionLookupRequests.lookupType'),
    page = _.get(req, 'body.dimensionLookupRequests.page'),
    dataModel = entityTypes[lookupType].model;

  dataModel.paginate({}, { page: page.page + 1, limit: page.size } ,function(err, response){
    if(err){
      res.json({message: err})
    }

    const result = _.map(_.get(response, 'docs'), function(resObject){
      return {
        key: resObject._id,
        id: resObject._id,
        label: resObject.category_name,
        name: resObject.category_name
      }
    });

    const lookupResponse = {
      [lookupType] : {
        result: result,
        hasMore: _.get(response, 'pages') > _.get(response, 'page')
      }
    };

    res.json(lookupResponse);
  });
};
