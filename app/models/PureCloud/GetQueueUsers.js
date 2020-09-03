/*=================================================================*/
const purecloudConfig = require('../../../config/purecloudConfig');
var request = require('request-promise');
const QUEUE_USERS_URL = purecloudConfig.widget.QUEUE_USERS_URL;
const CLIENT_ID = purecloudConfig.widget.CLIENT_ID;
const CLIENT_SECRET_ID = purecloudConfig.widget.CLIENT_SECRET_ID;
const TOKEN_URL = purecloudConfig.widget.TOKEN_URL
const QUEUE_INFOS = purecloudConfig.widget.QUEUE_INFOS

module.exports = {
	getQueueUsers: async function (req, res, callback) {

		var optionsAuth = {
			'method': 'POST',
			'url': TOKEN_URL,
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET_ID).toString('base64')
			},
			'form': {
				'grant_type': 'client_credentials'
			  }
		};

		request(optionsAuth)
		.then(async resp => {
			var objRes = JSON.parse(resp)
			objRes.statusCode = 200
			await getQueuesInfos(objRes, callback)
		})
		.catch(err => {
			callback(err)
		})
	}
};

async function getQueuesInfos(response, callback){
			
		var respObj = {queues:[]}

		for (const [idx, element] of QUEUE_INFOS.queues.entries()){

			var optionsUsers = {
				'method': 'GET',
				'url': QUEUE_USERS_URL.replace('{queueId}', element.id),
				'headers': {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + response.access_token
				}
			};

			await request(optionsUsers)
			.then(resp => {
				console.log(resp)
				var userObj = JSON.parse(resp)
				element.enable = false
				for (const [indx, elementUser] of userObj.entities.entries()){
					if(elementUser.user.routingStatus){
						console.log('JOINED: ' + elementUser.joined)
						if(elementUser.joined){
							console.log('EXISTE USER')
							element.enable = true
							break
						}
					}
				}
				respObj.queues.push(element)
				respObj.statusCode = 200
			})
			.catch(err => {
				callback(err)
			})
		}

		callback(respObj);

}