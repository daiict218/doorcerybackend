const fs = require('fs');

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region:  	'us-west-2',
  accessKeyId: 'AKIAIASGB2ZGJSYITVZQ',
  secretAccessKey: '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',
  maxRetries: process.env.AWS_MAX_RETRIES || 5
});

exports.upload = function(req, res, next) {
  console.log(req.files);
  const file = req.files.file,
    filename = file.originalFilename,
    stream = fs.createReadStream(file.path);

  stream.on('error', err => {
    console.error(err, err.stack);
    return next(err);
  });

  const config = {
    Bucket: 'kitabikeede-test',
    Body: stream,
    Key: `profile-pics/${filename}`,
    ACL: 'public-read',
    ContentType: file.headers['content-type']
  };

  var fileUrl = '';

  s3.upload(config, (err, response) => {
    if (err) {
      console.error(err, err.stack);
      return next(err);
    }

    fileUrl = response.Location;
    res.json({url: fileUrl});
  });
}
