const host = "https://genesyscloudapps.coddera.com:3002";
// const host = "http://localhost:3002";

function chat() {
    $("#initial_card_widget_logo").attr("src", host + "/images/sebrae_1.png");
    $("#card_widget_logo").attr("src", host + "/images/sebrae_1.png");
    $(".send-msg-btn").css('background-image', 'url("' + host + '/images/send_btn.png' + '")');
    $(".attach-btn").css('background-image', 'url("' + host + '/images/paperclip.png' + '")');
    $("#form-body").css('background-image', 'url("' + host + '/images/sebrae_back.png' + '")');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);


    console.log('Teste: ' + atob(urlParams.get('data')));
    var params = JSON.parse(atob(urlParams.get('data')));

    console.log(params['name'])
    console.log(params['phone'])
    console.log(params['cpf'])
    console.log(params['email'])
    console.log(params['queue'])
    console.log(params['question'])

    var firstName = params['name'];
    var phoneNumber = params['phone'];
    var email = params['email'];
    var question = params['question'];
    var cpf = params['cpf'];
    var queue = params['queue'];

    var fileUpload = document.getElementById('widget-file-upload');

    var chatObj = {
        member: {id: ''},
        data: {},
        typingControl: true,
        heartbeatCount: 0,
        queue: {id: ''},
        operatorConnected: true
    };

    fileUpload.onchange = function (){
        var fReader = new FileReader();
        const name = fileUpload.files[0].name;
        const type = fileUpload.files[0].type;

        fReader.readAsDataURL(fileUpload.files[0]);
        fReader.onloadend = function(event){
            var xhttp = new XMLHttpRequest();
            
            var data = {
                base64: event.target.result,
                name: name,
                type: type,
            };
    
            xhttp.onloadend = function() {
                var msg = "";
                if (this.status == 200) {
                    var data = JSON.parse(this.response);
                    msg = "Segue o link do anexo: " + data.url
                    sendMsg(msg, chatObj.data.id, chatObj.data.member.id, chatObj.data.jwt);
                } else {
                    msg = "Desculpe houve um erro no envio do anexo." 
                    sendMsg(msg, chatObj.data.id, chatObj.data.member.id, chatObj.data.jwt);
                }
            };

            xhttp.open("POST", host + "/coddera-widget/aws/uploadS3", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(data));

        }
    }


    document.getElementById('send-msg-btn').onclick = function (){
        var msg = $('.send-msg-txt').val();
        sendMsg(msg, chatObj.data.id, chatObj.data.member.id, chatObj.data.jwt);
    }
    
    var data = {
        name: firstName,
        phone: phoneNumber.replace(/ /g, ''),
        email: email,
        queue: queue,
        cpf: cpf
    };
    
    var xhttp = new XMLHttpRequest();

    xhttp.onloadend = function() {
        while(this.status == 0){
            console.log('wait');
        }
            if (this.status == 200) {
            //$('.custom-card-body').slideToggle("fast");
            chatObj.data = JSON.parse(this.response).data;

            console.log('Init Websocket - ' + chatObj.data.eventStreamUri)
            
            var socket = new WebSocket(chatObj.data.eventStreamUri, "protocolOne");
            var data = new Date();
            var hora    = data.getHours();
            var min     = data.getMinutes();

            $('#dialog-header').append('<p>Conversa iniciada às ' + hora + ':' + min + '. Aguarde, um atendente logo estará disponível</p>');

            socket.onopen = function(event){
                sendMsg(question, chatObj.data.id, chatObj.data.member.id, chatObj.data.jwt);
            }

            socket.onmessage = function (event) {
                console.log(event.data);
                var eventData = JSON.parse(event.data);

                switch (eventData.topicName) {
                    case 'v2.conversations.chats.' + chatObj.data.id + '.members':

                        if(eventData.eventBody.member.state == 'ALERTING'){
                            chatObj.member.id = eventData.eventBody.member.id;
                        }else if(eventData.eventBody.member.state == 'CONNECTED' && chatObj.member.id == eventData.eventBody.member.id){                                
                            $('.custom-card-footer').show();
                            
                            document.getElementById('send-msg-txt').oninput = function (){
                                var xhttp = new XMLHttpRequest();
                    
                                var data = {
                                    conversationId: chatObj.data.id,
                                    memberId: chatObj.data.member.id,
                                    token: chatObj.data.jwt,
                                };
                        
                                xhttp.onloadend = function() {
                                    console.log('Response Code: ' + this.status)
                                    console.log('Response: ' + this.response)
                                };
                    
                                xhttp.open("POST", host + "/coddera-widget/chat/send-typing", true);
                                xhttp.setRequestHeader("Content-type", "application/json");
                                xhttp.send(JSON.stringify(data));
                            }

                            if(chatObj.operatorConnected){
                                $('.chat-dialog').append('<p>O operador acabou de se connectar.</p>')
                                chatObj.operatorConnected = false
                            }
                        } else if (eventData.eventBody.member.state == 'DISCONNECTED' && chatObj.member.id == eventData.eventBody.member.id){
                            socket.close();
                            $('.custom-card-footer').hide();
                            $('.chat-dialog').append('<p>O chat foi encerrado. Obrigado pelo contato.</p>');
                            var typing = document.getElementById('block-typing');
                            if(typing != null){
                                typing.parentNode.removeChild(typing);
                                chatObj.typingControl = true;
                            }
                        }

                        break;
                    case 'v2.conversations.chats.' + chatObj.data.id + '.messages':
                        
                        var html = "";
                        if(eventData.metadata.type == 'typing-indicator' && chatObj.typingControl){
                            if(chatObj.member.id == eventData.eventBody.sender.id){
                                html += '<div class="block-dialog"  id="block-typing">';
                                html += ' <div class="typing-msg">'
                                html += '  <div class="typing">';
                                html += '   <div class="dot"></div>';
                                html += '   <div class="dot"></div>';
                                html += '   <div class="dot"></div>';
                                html += '  </div>';
                                html += ' </div>';
                                html += '<div class="agent-name">Digitando</div>';
                                html += '</div>';
                    
                                $('.chat-dialog').append(html);
                                document.getElementById('chat-body').scrollTo(0, document.getElementById('chat-body').scrollHeight);
                                chatObj.typingControl = false;
                                chatObj.heartbeatCount = 0;
                            }
                        }

                        if(eventData.metadata.type == 'message'){
                            if(chatObj.member.id == eventData.eventBody.sender.id){
                                if(eventData.eventBody.body != ''){
                                    if(chatObj.member.id == eventData.eventBody.sender.id){
                                        if(eventData.eventBody.body != ''){
                                            html += '<div class="block-dialog"  id="block-agent">';
                                            html += '<div class="agent-msg">'
                                            html += eventData.eventBody.body
                                            html += '</div>';
                                            html += '<div class="agent-name">Atendente</div>';
                                            html += '</div>';
                        
                                            $('.chat-dialog').append(html);
                                            var typing = document.getElementById('block-typing');
                                            if(typing != null){
                                                typing.parentNode.removeChild(typing);
                                                chatObj.typingControl = true;
                                            }
                                            document.getElementById('chat-body').scrollTo(0, document.getElementById('chat-body').scrollHeight);
                                        }
                                    }
                                }
                            }
                        }

                        break;
                    case 'channel.metadata':
                        
                        if(eventData.eventBody.message == "WebSocket Heartbeat"){
                            chatObj.heartbeatCount += 1;

                            if(chatObj.heartbeatCount == 2) {
                                var dialog = document.getElementById('chat-dialog');
                                
                                if(dialog.querySelector('#block-typing')){
                                    var typing = document.getElementById('block-typing');
                                    typing.parentNode.removeChild(typing);
                                    chatObj.typingControl = true;
                                }

                                chatObj.heartbeatCount = 0;
                            }
                        }
                        break;
                    default:
                }
            }
            }else{
                console.log(">>>>>>>> CREATE CHAT ERROR: " + this.response);
            }
    };

    xhttp.open("POST", host + "/coddera-widget/chat/create", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));    
};

function sendMsg(msg, id, memberId, token) {

    var data = {
        conversationId: id,
        memberId: memberId,
        token: token,
        msg: msg,
        bodyType: "standard"
    };

    var xhttp = new XMLHttpRequest();
    
    xhttp.onloadend = function() {
        if (this.status == 200) {
            var html = "";
            if(msg != ''){
                html += '<div class="block-dialog"  id="block-client">';
                html += '<div class="client-ballon">'
                html += '<span class="client-msg">' + msg + '<span>'
                html += '</div>';
                html += '<div class="client-info"><span class="client-name">Você</span></div>';
                html += '</div>';

                $('.chat-dialog').append( html);
            }

            document.getElementById('chat-body').scrollTo(0, document.getElementById('chat-body').scrollHeight);
            $('.send-msg-txt').val("");
        }else{
            console.log('>>>>>>>> SEND MESSAGE ERROR: ' + this.response)
        }

    };

    xhttp.open("POST", host + "/coddera-widget/chat/send", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
}

chat();
