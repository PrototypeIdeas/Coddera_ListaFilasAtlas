var purecloudConfig = {};
purecloudConfig.widget = {};
purecloudConfig.aws = {};

//CREATE CHAT CONFIG
purecloudConfig.widget.CREATE_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations'

purecloudConfig.widget.PURECLOUD_ORG_ID = '947659c0-d25d-4f72-b07f-bf5181952f5b';
purecloudConfig.widget.PURECLOUD_DEPLOYMENT_ID = 'b739e5a4-91d8-48e9-a373-fbf5741663fb';
purecloudConfig.widget.TARGET_ADRESS = 'Atlas';
purecloudConfig.widget.LANGUAGE = 'pt-BR';


//SEND MESSAGE CONFIG
purecloudConfig.widget.SEND_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations/{conversationId}/members/{memberId}/messages'


//SEND TYPING CONFIG
purecloudConfig.widget.SEND_TYPING_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations/{conversationId}/members/{memberId}/typing'

//FINALYZE CONFIG
purecloudConfig.widget.FINALYZE_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations/{conversationId}/members/{memberId}'


//QUEUE USERS
purecloudConfig.widget.QUEUE_USERS_URL = 'https://api.mypurecloud.com/api/v2/routing/queues/{queueId}/users?routingStatus=IDLE&routingStatus=NOT_RESPONDING&routingStatus=COMMUNICATING&routingStatus=INTERACTING'
purecloudConfig.widget.QUEUE_INFOS = {
    queues:[
        {
            id: "0706597a-214f-475b-a969-e04b1516da98",
            name: "CX_Atlas_Geral",
        }
    ]
}

//OAUTH CONFIG
purecloudConfig.widget.TOKEN_URL = 'https://login.mypurecloud.com/oauth/token'
purecloudConfig.widget.CLIENT_ID = '62f40430-a694-416d-a45c-dd19e63a92a9'
purecloudConfig.widget.CLIENT_SECRET_ID = 'MZ4treAMJ039Igd0hxb5hxWa6NxLEsIHsj6OcRaJqI4'


//AWS CONFIG
purecloudConfig.aws.ACCESS_KEY_ID = ''
purecloudConfig.aws.SECRET_ACCESS_KEY = ''
purecloudConfig.aws.AWS_REGION = 'sa-east-1'
purecloudConfig.aws.S3_BUCKET = 'anexoschat'

module.exports = purecloudConfig;