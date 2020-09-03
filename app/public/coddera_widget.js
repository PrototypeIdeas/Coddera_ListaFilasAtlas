// const host = "http://ec2-18-228-171-32.sa-east-1.compute.amazonaws.com:3000";
const host = "http://localhost:3000";

function widget() {
    $('#purecloud-widget').load(host + "/coddera-widget", function () {
        $("#initial_card_widget_logo").attr("src", host + "/images/sebrae_1.png");
        $("#card_widget_logo").attr("src", host + "/images/sebrae_1.png");
        $(".send-msg-btn").css('background-image', 'url("' + host + '/images/send_btn.png' + '")');
        $("#form-body").css('background-image', 'url("' + host + '/images/sebrae_back.png' + '")');

        var submitButton = document.getElementById('submit-widget');
        var openFormButton = document.getElementById('open-form-widget-button');
        var firstName = document.getElementById('first-name');
        var phoneNumber = document.getElementById('phone-number');
        var email = document.getElementById('email');
        var question = document.getElementById('question');
        var removeBtn = document.getElementById('remove-coddera-widget-card-btn');

        var chatObj = {
            member: {id: ''},
            data: {},
            typingControl: true,
            heartbeatCount: 0,
            queue: {id: ''}
        };

        queueButtons()

    
        $('#coddera-widget-card').slideToggle("fast");
    

        document.getElementById('send-msg-btn').onclick = function (){
            var msg = $('.send-msg-txt').val();
            sendMsg(msg, chatObj.data.id, chatObj.data.member.id, chatObj.data.jwt);
        }

        removeBtn.onclick = function () {
            
            if(chatObj.data.member != undefined){                  
                var xhttp = new XMLHttpRequest();
                
                var data = {
                    conversationId: chatObj.data.id,
                    memberId: chatObj.data.member.id,
                    token: chatObj.data.jwt,
                };
        
                xhttp.onloadend = function() {
                    widget();
                };
    
                xhttp.open("DELETE", host + "/coddera-widget/chat/finalyze", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify(data));
            } else {
                widget();
            }            
        }
    
        openFormButton.onclick = function (){
            $('#coddera-widget-card').slideToggle("fast");
            $('#open-form-widget-button').hide();
        }
    
        firstName.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, email, question);
        }
        phoneNumber.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, email, question);
        }

        email.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, email, question);
        }

        question.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, email, question);
        }
    
        submitButton.onclick = function () {
            $('#form-body').slideToggle("fast");
            $('.wait-card').show();

            var data = {
                name: firstName.value,
                phone: phoneNumber.value.replace(/ /g, ''),
                email: email.value,
                queue: document.getElementById("queueId").value
            };
            
            var xhttp = new XMLHttpRequest();

            xhttp.onloadend = function() {
                while(this.status == 0){
                    console.log('wait');
                }
                 if (this.status == 200) {
                    $('.wait-card').hide();
                    $('.custom-card-body').slideToggle("fast");
                    chatObj.data = JSON.parse(this.response).data;

                    console.log('Init Websocket - ' + chatObj.data.eventStreamUri)
                    
                    var socket = new WebSocket(chatObj.data.eventStreamUri, "protocolOne");
                    var data = new Date();
                    var hora    = data.getHours();
                    var min     = data.getMinutes();

                    $('#dialog-header').append('<p>Conversa iniciada às ' + hora + ':' + min + '. Aguarde, um atendente logo estará disponível</p>');

                    socket.onopen = function(event){
                        sendMsg(question.value, chatObj.data.id, chatObj.data.member.id, chatObj.data.jwt);
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
                                        console.log('Escrevendo...');
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

                                    $('.chat-dialog').append('<p>O operador acabou de se connectar.</p>')
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
    });
};

function btnSubmitValidation(firstName, phoneNumber, email, question) {
    $('#form-group').css('border-bottom', '2px solid #FCAF17');
    if(firstName.value != "" && phoneNumber.value != "" && email.value != "" && question.value != ""){
        $('#submit-widget').prop("disabled", false);
    } else {
        $('#submit-widget').prop("disabled", true);
    }
}

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
                html += '<div class="client-msg">'
                html += msg
                html += '</div>';
                html += '<div class="client-name">Você</div>';
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

function queueButtons() {

    var xhttp = new XMLHttpRequest();
    
    xhttp.onloadend = function() {
        if (this.status == 200) {

            var objResp = JSON.parse(this.response)
            var html = "";

            for (const [idx, element] of objResp.queues.entries()){
                if(element.enable){
                    html += '<button type="button" value="'+element.id+'" class="btn queue-btn">'  + element.name + '</input>';
                } else {
                    html += '<button type="button" value="'+element.id+'" class="btn queue-btn" disabled>' + element.name + '</input>';
                }

            }

            $('#choose-queue').append( html);

            $('.queue-btn').on("click", function(){
                console.log($(this).val());
                document.getElementById("queueId").value = $(this).val();
                $('#choose-queue').slideToggle("fast");
                $('.custom-card-header').show();
                $('#form-body').show();
            });

        }else{
            console.log('>>>>>>>> SEND MESSAGE ERROR: ' + this.response)
        }

    };

    xhttp.open("GET", host + "/coddera-widget/chat/queue/users", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send('{}');
}

widget();
