const host = "https://genesyscloudapps.coddera.com:3002";
//const host = "http://localhost:3002";

function widget() {
    $('#purecloud-widget').load(host + "/coddera-widget", function () {
        $("#initial_card_widget_logo").attr("src", host + "/images/sebrae_1.png");
        $("#card_widget_logo").attr("src", host + "/images/sebrae_1.png");
        $(".send-msg-btn").css('background-image', 'url("' + host + '/images/send_btn.png' + '")');
        $(".attach-btn").css('background-image', 'url("' + host + '/images/paperclip.png' + '")');
        $("#form-body").css('background-image', 'url("' + host + '/images/sebrae_back.png' + '")');

        var submitButton = document.getElementById('submit-widget');
        var firstName = document.getElementById('first-name');
        var phoneNumber = document.getElementById('phone-number');
        var cpf = document.getElementById('cpf');
        var email = document.getElementById('email');
        var question = document.getElementById('question');

        queueButtons()    
    
        firstName.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, cpf, email, question);
        }

        phoneNumber.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, cpf, email, question);
        }

        cpf.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, cpf, email, question);
        }

        email.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, cpf, email, question);
        }

        question.oninput = function (){
            btnSubmitValidation(firstName, phoneNumber, cpf, email, question);
        }
    
        submitButton.onclick = function () {
            $('#form-body').slideToggle("fast");
            $('.wait-card').show();

            var data = {
                name: firstName.value,
                phone: phoneNumber.value.replace(/ /g, ''),
                cpf: cpf.value.replace(/ /g, ''),
                email: email.value,
                queue: document.getElementById("queueId").value,
                question: question.value
            };

            window.open(host + "/chat-widget?data=" + btoa(JSON.stringify(data), "teste", "height=200,width=200"));
        };
        
    });
};

function btnSubmitValidation(firstName, phoneNumber, cpf, email, question) {
    $('#form-group').css('border-bottom', '2px solid #FCAF17');
    if(firstName.value != "" && phoneNumber.value != "" && cpf.value != "" && email.value != "" && question.value != ""){
        $('#submit-widget').prop("disabled", false);
    } else {
        $('#submit-widget').prop("disabled", true);
    }
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
