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
}

exports.addEntity = function(req, res, next){
  const entityType = _.get(req, 'body.entityType'),
    dataModel = entityTypes[entityType].model,
    entity = req.body.entity;

    console.log(entityType, entity);

  dataModel.create(entity, function (err, entity) {
   if (err) next(err);

   res.json(entity);
 });
};

exports.getEntities = function(req, res, next){
  const entityType = _.get(req, 'query.entityType'),
    dataModel = entityTypes[entityType].model;

  dataModel.find({}, function(err, entities){
    if(err){
      res.json({message: err})
    }

    res.json({entities});
  });
};
