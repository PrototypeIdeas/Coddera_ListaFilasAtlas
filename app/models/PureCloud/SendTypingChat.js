/*=================================================================*/
const purecloudConfig = require('../../../config/purecloudConfig');
var request = require('request');
const SEND_TYPING_URL = purecloudConfig.widget.SEND_TYPING_URL;

module.exports = {
	sendTyping : function(req, res, callback) {
        // Authenticate with PureCloud
        var conversationId = req.body.conversationId;
		var memberId = req.body.memberId;
		var token = req.body.token;
		
		
		var options = {
			'method': 'POST',
			'url': SEND_TYPING_URL.replace('{conversationId}', conversationId).replace('{memberId}', memberId),
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