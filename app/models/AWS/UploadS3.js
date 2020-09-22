const purecloudConfig = require('../../../config/purecloudConfig');
const AWS = require('aws-sdk');
const fs = require("fs");

const ACCESS_KEY_ID = purecloudConfig.aws.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = purecloudConfig.aws.SECRET_ACCESS_KEY;
const AWS_REGION = purecloudConfig.aws.AWS_REGION;
const S3_BUCKET = purecloudConfig.aws.S3_BUCKET;

module.exports = {
	fileUpload: async (req, callback) => {

		var base64 = req.body.base64;
		var name = req.body.name;
		var type = req.body.type;
		var pathFile = "tempFiles/".concat(name);

		AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });

		const s3 = new AWS.S3();
	
		let base64Content = base64.split(';base64,').pop();
		fs.writeFile(pathFile, base64Content, {encoding: 'base64'}, function(err) {
			console.log('File created');
			// Read content from the file
			const fileContent = fs.readFileSync(pathFile);

			// Setting up S3 upload parameters
			const params = {
				Bucket: S3_BUCKET,
				Key: name, // File name you want to save as in S3
				Body: fileContent,
				ACL: 'public-read'
			};
		
			// Uploading files to the bucket
			s3.upload(params, function(err, data) {
				if (err) {
					throw err;
				}
				callback({url: data.Location})

				try {
					fs.unlinkSync(pathFile)
					console.error("File removed")
				  } catch(err) {
					console.error(err)
				  }
			});
		});
	  }	  
};

