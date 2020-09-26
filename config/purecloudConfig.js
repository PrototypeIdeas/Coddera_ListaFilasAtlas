var purecloudConfig = {};
purecloudConfig.widget = {};
purecloudConfig.aws = {};

//CREATE CHAT CONFIG
purecloudConfig.widget.CREATE_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations'

purecloudConfig.widget.PURECLOUD_ORG_ID = '5b653c63-866d-447c-a2a1-10b549933b26';
purecloudConfig.widget.PURECLOUD_DEPLOYMENT_ID = '3132b2e3-fa67-412c-bd3e-15e86381a41f';
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
            id: "cb0e49de-dfe8-456e-8e58-e2443b8372a5",
            name: "Atlas Geral Teste",
        },
        {
            id: "140072c7-44dc-4749-9492-aa33498ae7b1",
            name: "Dako Teste",
        }
    ]
}

//OAUTH CONFIG
purecloudConfig.widget.TOKEN_URL = 'https://login.mypurecloud.com/oauth/token'
purecloudConfig.widget.CLIENT_ID = '74bb872d-1042-4a46-88fe-dd20a1c32c43'
purecloudConfig.widget.CLIENT_SECRET_ID = 'GWfhXu3JTUkaj8fJSAQSzmqY0hgoXRV2tD9F9cgscFs'


//AWS CONFIG
purecloudConfig.aws.ACCESS_KEY_ID = ''
purecloudConfig.aws.SECRET_ACCESS_KEY = ''
purecloudConfig.aws.AWS_REGION = 'sa-east-1'
purecloudConfig.aws.S3_BUCKET = 'anexoschat'

module.exports = purecloudConfig;