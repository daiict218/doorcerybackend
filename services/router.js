const passport = require('passport');

const EntityController = require('../controllers/entity_controller');
const FileuploadController = require('../controllers/fileupload_controller');

const LookupController = require('../controllers/lookup_controller');

const passportService = require('./passport');

//This line should come just before router
var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});
const router = require('express').Router();

function protected(req, res, next){
  res.send('Here is the secret');
}

//End point to upload a file
router.route('/upload').post(FileuploadController.upload);

router.route('/getEntities').get(EntityController.getEntities);
router.route('/addEntity').post(EntityController.addEntity);

router.route('/bulkLookUp').post(LookupController.dimensionLookUp);

module.exports = router;
