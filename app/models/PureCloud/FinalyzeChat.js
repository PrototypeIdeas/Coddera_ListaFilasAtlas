/*=================================================================*/
const purecloudConfig = require('../../../config/purecloudConfig');
var request = require('request');
const FINALYZE_URL = purecloudConfig.widget.FINALYZE_URL;

module.exports = {
	finalyze : function(req, res, callback) {
        // Authenticate with PureCloud
        var conversationId = req.body.conversationId;
		var memberId = req.body.memberId;
		var token = req.body.token;
		
		
		var options = {
			'method': 'DELETE',
			'url': FINALYZE_URL.replace('{conversationId}', conversationId).replace('{memberId}', memberId),
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},

			body: ''
		};

		request(options, function (error, response) { 
			if (error) throw new Error(error);
			callback({statusCode: response.statusCode,
				body: response.body})
		});
	}
};