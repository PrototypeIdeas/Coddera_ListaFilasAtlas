/*=================================================================*/
const purecloudConfig = require('../../../config/purecloudConfig');
var request = require('request');
const SEND_URL = purecloudConfig.widget.SEND_URL;

module.exports = {
	sendMsg : function(req, res, callback) {
        // Authenticate with PureCloud
        var conversationId = req.body.conversationId;
		var memberId = req.body.memberId;
		var bodyType = req.body.bodyType;
		var msg = req.body.msg;
		var token = req.body.token;
		
		const chatMsgData = {
			body: msg,
			bodyType: bodyType
		  }
		
		var options = {
			'method': 'POST',
			'url': SEND_URL.replace('{conversationId}', conversationId).replace('{memberId}', memberId),
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},

			body: JSON.stringify(chatMsgData)
		};

		request(options, function (error, response) { 
			if (error) throw new Error(error);
			callback({statusCode: response.statusCode,
						body: response.body})
		});
	}
};