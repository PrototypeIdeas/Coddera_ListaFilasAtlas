/*=================================================================*/
const purecloudConfig = require('../../../config/purecloudConfig');

const PURECLOUD_ORG_ID = purecloudConfig.widget.PURECLOUD_ORG_ID;
const PURECLOUD_DEPLOYMENT_ID = purecloudConfig.widget.PURECLOUD_DEPLOYMENT_ID;
const TARGET_ADRESS = purecloudConfig.widget.TARGET_ADRESS;
const LANGUAGE = purecloudConfig.widget.LANGUAGE;
const URL = purecloudConfig.widget.CREATE_URL;

module.exports = {
	createChat : function(req, res, callback) {
        // Authenticate with PureCloud
        var name = req.body.name;
		var phone = req.body.phone;
		var email = req.body.email;
		var queue = req.body.queue;
		var cpf = req.body.cpf;
		
		console.log('>>>>>>>>>>>>> INIT PURECLOUD Widget');
		console.log('>>>>>>>>>>>>> Name: ' + name + '|Phone: ' + phone + '|Email: ' + email + 'Fila: ' + queue);
		
		const createChatData = {
			organizationId: PURECLOUD_ORG_ID,
			deploymentId: PURECLOUD_DEPLOYMENT_ID,
			routingTarget : {
				targetType : "queue",
				targetAddress: TARGET_ADRESS
			},
			memberInfo : { 
				displayName : name,
				lastName : "",
				firstName : name,
				email : email,
				phoneNumber : phone,
				customFields : {
					customCPF: cpf,
					language: LANGUAGE,				
					displayName : name,
					lastName : "",
					firstName : name,
					email : email,
					phoneNumber : phone,
					VariavelA: 'A',
					VariavelB: 'B',
					VariavelC: 'C',
					fila: queue
				}
			}
		}


		const axios = require('axios')

		axios.post(URL, createChatData)
		.then((res) => {
			console.log(res.status);
			console.log(res.statusText);
			console.log(res.data);
			callback({
				status: res.status,
				statusText: res.statusText,
				data: res.data
			});
		})
		.catch((error) => {
			console.error(error)
			callback(error);
		})
	}
};