# Coddera_ListaFilasAtlas

## Requerimentos

  Para o desenvolvimento e publicação você precisará apenas do Node.js e do Git instalados em seu ambiente.

### Node
- #### Instalação do Node no Windows

  Acesse [official Node.js website](https://nodejs.org/) e faça o download do instalador.

- #### Instalação do Node no Ubuntu
  Instale o nodejs e o npm via apt install, basta executar os seguintes comandos.
  
      $ sudo apt install nodejs
      $ sudo apt install npm

  Verifique de as instalações foram feitas com sucesso.
    (Instale a versão atual para o Node e para o NPM)
    
    $ node --version
    v10.16.3

    $ npm --version
    6.9.0

Se você precisar atualizar o `npm`, poderá fazê-lo usando o` npm`! 

    $ npm install npm -g

### Git
- #### Instalação do Git no Windows

  Acesse (https://git-scm.com/downloads) e faça o download do instalador.

- #### Instalação do Git no Ubuntu
  Instale o git via apt install, basta executar os seguintes comandos.
  
      $ sudo apt-get install git

  Verifique de as instalações foram feitas com socesso.
    (Não há necessidade de versão específica para o Git)
    
    $ git --version
    git version 2.26.0


## Instalação

    $ git clone https://github.com/PrototypeIdeas/Coddera_ListaFilasAtlas.git
    $ cd Coddera_ListaFilasAtlas
    $ npm install

## Configure a Aplicação

  Abra `/app/public/coddera_widget.js` e edite a variável host na primeira linha com o host público do servidor onde está será instalado.

  No arquivo /config/purecloudConfig.js estão as configurações do Purecloud que poderão ser editadas conforme conveniência.
  
  As filas que serão validas também são descritas no  /config/purecloudConfig.js.
  
  Ex:   
  purecloudConfig.widget.QUEUE_INFOS = {
    queues:[
        {
            id: "skdsfjdsklfjks-skjdhkjadh8e58-uasdhashduash",
            name: "Atlas Geral Teste",
        },
        {
            id: "asdklçjaslkid7-44dc1456fd5dsfdsf-oaskaoksoa",
            name: "Dako Teste",
        }
    ]
  }
  

## Rodando o projeto
  
  Na pasta raiz execute o comando.
  
    $ node app.js
  
  Para produção é aconselhado utilizadar um gerenciador de processos Node.js. Ex: PM2 (https://pm2.keymetrics.io/)

## Utilizando widget

Código necessário para carregar o widget em qualquer página html: 
	
	<div id="purecloud-widget"></div>
	
	<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" 		crossorigin="anonymous"></script>
	
	<script type="text/javascript" src="http://localhost:3000/coddera_widget.js"></script>

O widget será construido na div - purecloud-widget (atenção para o a variavel host do coddera_widget.js conforme explicado acima)

## API
  
  API Coddera Purecloud Widget
  
  Create Chat

  URL: http://localhost:3000/coddera-widget/chat/create
  
  Body: 
  	{
	        "name":"Teste",
	        "phone":"11999972564",
          	"email":"teste@teste.com",
          	"question":"Teste?"
        }
  
  (todos parametros são obrigatórios)
  
  Respostas:
    
    Success:
      status: 200 OK
      body: {
            id: '0e4a4c93-dd6f-4440-929a-3f22fb1c7d3f',
            jwt: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMjNiMzkzLWZmZDMtNDFjNi05ODk5LTY4ZjlmMmIwZTZhNSIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvbnYiOiIwZTRhNGM5My1kZDZmLTQ0NDAtOTI5YS0zZjIyZmIxYzdkM2YiLCJkaWQiOiI3NTM5YzcxNC0yZTY1LTQwMmQtYWZmMi0zN2Y4MzYyZGQ2N2UiLCJzdWIiOiIyZjk5OTUzNy1jNGFkLTQ3NWQtYmQ5NS0zZDM4YTgxNGNkNDYifSwiZXhwIjoxNTk2NzExNzQ5LCJpYXQiOjE1OTY2MzI5ODgsImlzcyI6InVybjpwdXJlY2xvdWQ6d2ViY2hhdCIsIm9yZyI6Ijk0NzY1OWMwLWQyNWQtNGY3Mi1iMDdmLWJmNTE4MTk1MmY1YiJ9.ul9ehGztfIRJM9LwCSnBhxZgmFBhEd6hQ2kRXufbDOe4-J_XueJwU7nkWG0SJlCoMuXzOTw05GcZ7AtO502CYhZ3TtTUxSlFRfwYC_hPLPjeqlz_OZKh6-obChW9CQAM2Kpsk4XzuvxYQ1OEkjuWQWsAKuvGCGaADIrY9RutfgU1-BgETS9ro60GA7cs647egCky4uPhC3JXDxtShns07wsPQ3Y6iugugCZjh2sJU1kZEalvTFskR0fOK7H3MY4wURjmiVWH-vDrUx-FF0l9Mys5aWG64B1Zk4fH2pCeHYASTJ-xTAL5HJ8PWuO7L6odXWXm4Q6ag0hg4QwbxZfvzQ',
            eventStreamUri: 'wss://carrier-pigeon.mypurecloud.com/v1/token/eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMjNiMzkzLWZmZDMtNDFjNi05ODk5LTY4ZjlmMmIwZTZhNSIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvbnYiOiIwZTRhNGM5My1kZDZmLTQ0NDAtOTI5YS0zZjIyZmIxYzdkM2YiLCJkaWQiOiI3NTM5YzcxNC0yZTY1LTQwMmQtYWZmMi0zN2Y4MzYyZGQ2N2UiLCJzdWIiOiIyZjk5OTUzNy1jNGFkLTQ3NWQtYmQ5NS0zZDM4YTgxNGNkNDYifSwiZXhwIjoxNTk2NzExNzQ5LCJpYXQiOjE1OTY2MzI5ODgsImlzcyI6InVybjpwdXJlY2xvdWQ6d2ViY2hhdCIsIm9yZyI6Ijk0NzY1OWMwLWQyNWQtNGY3Mi1iMDdmLWJmNTE4MTk1MmY1YiJ9.ul9ehGztfIRJM9LwCSnBhxZgmFBhEd6hQ2kRXufbDOe4-J_XueJwU7nkWG0SJlCoMuXzOTw05GcZ7AtO502CYhZ3TtTUxSlFRfwYC_hPLPjeqlz_OZKh6-obChW9CQAM2Kpsk4XzuvxYQ1OEkjuWQWsAKuvGCGaADIrY9RutfgU1-BgETS9ro60GA7cs647egCky4uPhC3JXDxtShns07wsPQ3Y6iugugCZjh2sJU1kZEalvTFskR0fOK7H3MY4wURjmiVWH-vDrUx-FF0l9Mys5aWG64B1Zk4fH2pCeHYASTJ-xTAL5HJ8PWuO7L6odXWXm4Q6ag0hg4QwbxZfvzQ',
            member: {
                id: '2f999537-c4ad-475d-bd95-3d38a814cd46'
        }
}
            
     Error:
      status: 400 BadRequest (Parametro phone vazio)
      body: [
            AtOTI5YS0zZjIyZmIxYzdkM2YiLCJkaWQiOiI3NTM5YzcxNC0yZTY1LTQwMmQtYWZmMi0zN2Y4MzYyZGQ2N2UiLCJzdWIiOiIyZjk5OTUzNy1jNGFkLTQ3NWQtYmQ5NS0zZDM4YTgxNGNkNDYifSwiZXhwIjoxNTk2NzExNzQ5LCJpYXQiOjE1OTY2MzI5ODgsImlzcyI6InVybjpwdXJlY2xvdWQ6d2ViY2hhdCIsIm9yZyI6Ijk0NzY1OWMwLWQyNWQtNGY3Mi1iMDdmLWJmNTE4MTk1MmY1YiJ9.ul9ehGztfIRJM9LwCSnBhxZgmFBhEd6hQ2kRXufbDOe4-J_XueJwU7nkWG0SJlCoMuXzOTw05GcZ7AtO502CYhZ3TtTUxSlFRfwYC_hPLPjeqlz_OZKh6-obChW9CQAM2Kpsk4XzuvxYQ1OEkjuWQWsAKuvGCGaADIrY9RutfgU1-BgETS9ro60GA7cs647egCky4uPhC3JXDxtShns07wsPQ3Y6iugugCZjh2sJU1kZEalvTFskR0fOK7H3MY4wURjmiVWH-vDrUx-FF0l9Mys5aWG64B1Zk4fH2pCeHYASTJ-xTAL5HJ8PWuO7L6odXWXm4Q6ag0hg4QwbxZfvzQ", }  {
                  "location": "body",
                  "param": "phone",
                  "msg": "Parametro {phone} é obrigatório",
                  "value": ""
              }
            ]
      
      
      status: 400 BadRequest (Parametro name vazio)
      body: [
              {
                  "location": "body",
                  "param": "name",
                  "msg": "Parametro {name} é obrigatório",
                  "value": ""
              }
            ]
    
      status: 400 BadRequest (Parametro email vazio)
      body: [
              {
                  "location": "body",
                  "param": "email",
                  "msg": "Parametro {email} é obrigatório",
                  "value": ""
              }
            ]
            
      status: 400 BadRequest (Parametro question vazio)
      body: [
              {
                  "location": "body",
                  "param": "question",
                  "msg": "Parametro {question} é obrigatório",
                  "value": ""
              }
            ]
            
            
  Send Msg Chat

  URL: http://localhost:3000/coddera-widget/chat/send
  
  Body: 
  	{
		"conversationId":"0e4a4c93-dd6f-4440-929a-3f22fb1c7d3f",
		"memberId":"2f999537-c4ad-475d-bd95-3d38a814cd46",
		"token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMjNiMzkzLWZmZDMtNDFjNi05ODk5LTY4ZjlmMmIwZTZhNSIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvbnYiOiIwZTRhNGM5My1kZDZmLTQ0NDAtOTI5YS0zZjIyZmIxYzdkM2YiLCJkaWQiOiI3NTM5YzcxNC0yZTY1LTQwMmQtYWZmMi0zN2Y4MzYyZGQ2N2UiLCJzdWIiOiIyZjk5OTUzNy1jNGFkLTQ3NWQtYmQ5NS0zZDM4YTgxNGNkNDYifSwiZXhwIjoxNTk2NzExNzQ5LCJpYXQiOjE1OTY2MzI5ODgsImlzcyI6InVybjpwdXJlY2xvdWQ6d2ViY2hhdCIsIm9yZyI6Ijk0NzY1OWMwLWQyNWQtNGY3Mi1iMDdmLWJmNTE4MTk1MmY1YiJ9.ul9ehGztfIRJM9LwCSnBhxZgmFBhEd6hQ2kRXufbDOe4-J_XueJwU7nkWG0SJlCoMuXzOTw05GcZ7AtO502CYhZ3TtTUxSlFRfwYC_hPLPjeqlz_OZKh6-obChW9CQAM2Kpsk4XzuvxYQ1OEkjuWQWsAKuvGCGaADIrY9RutfgU1-BgETS9ro60GA7cs647egCky4uPhC3JXDxtShns07wsPQ3Y6iugugCZjh2sJU1kZEalvTFskR0fOK7H3MY4wURjmiVWH-vDrUx-FF0l9Mys5aWG64B1Zk4fH2pCeHYASTJ-xTAL5HJ8PWuO7L6odXWXm4Q6ag0hg4QwbxZfvzQ",
		"msg":"Teste msg"
		"bodyType":"standard"
        }
  
  (todos parametros são obrigatórios)
  
  Respostas:
    
    Success:
      status: 200 OK
      body: {
        "id": "d184e1de-b9c8-4dd3-b970-a2a5adbaac3a",
        "conversation": {
            "id": "0e4a4c93-dd6f-4440-929a-3f22fb1c7d3f",
            "selfUri": "/api/v2/conversations/0e4a4c93-dd6f-4440-929a-3f22fb1c7d3f"
        },
        "sender": {
            "id": "2f999537-c4ad-475d-bd95-3d38a814cd46"
        },
        "body": "Teste chat",
        "bodyType": "standard",
        "timestamp": "2020-08-05T13:09:49.546Z",
        "selfUri": "/api/v2/webchat/guest/conversations/0e4a4c93-dd6f-4440-929a-3f22fb1c7d3f/messages/d184e1de-b9c8-4dd3-b970-a2a5adbaac3a"
      }
            
     Error:
      status: 400 BadRequest (Parametro conversationId vazio)
      body: [
              {
                  "location": "body",
                  "param": "conversationId",
                  "msg": "Parametro {conversationId} é obrigatório",
                  "value": ""
              }
            ]
   
      status: 400 BadRequest (Parametro memberId vazio)
      body: [
              {
                  "location": "body",
                  "param": "memberId",
                  "msg": "Parametro {memberId} é obrigatório",
                  "value": ""
              }
            ]
            
      status: 400 BadRequest (Parametro token vazio)
      body: [
              {
                  "location": "body",
                  "param": "token",
                  "msg": "Parametro {token} é obrigatório",
                  "value": ""
              }
            ]
      
      status: 400 BadRequest (Parametro msg vazio)
      body: [
              {
                  "location": "body",
                  "param": "msg",
                  "msg": "Parametro {msg} é obrigatório",
                  "value": ""
              }
            ]
      
      status: 400 BadRequest (Parametro bodyType vazio)
      body: [
              {
                  "location": "body",
                  "param": "bodyType",
                  "msg": "Parametro {bodyType} é obrigatório",
                  "value": ""
              }
            ]
  
              
  Send Typing Chat

  URL: http://localhost:3000/coddera-widget/chat/send-typing
  
  Body: 
  	{
		"conversationId":"0e4a4c93-dd6f-4440-929a-3f22fb1c7d3f",
		"memberId":"2f999537-c4ad-475d-bd95-3d38a814cd46",
		"token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMjNiMzkzLWZmZDMtNDFjNi05ODk5LTY4ZjlmMmIwZTZhNSIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvbnYiOiIwZTRhNGM5My1kZDZmLTQ0NDAtOTI5YS0zZjIyZmIxYzdkM2YiLCJkaWQiOiI3NTM5YzcxNC0yZTY1LTQwMmQtYWZmMi0zN2Y4MzYyZGQ2N2UiLCJzdWIiOiIyZjk5OTUzNy1jNGFkLTQ3NWQtYmQ5NS0zZDM4YTgxNGNkNDYifSwiZXhwIjoxNTk2NzExNzQ5LCJpYXQiOjE1OTY2MzI5ODgsImlzcyI6InVybjpwdXJlY2xvdWQ6d2ViY2hhdCIsIm9yZyI6Ijk0NzY1OWMwLWQyNWQtNGY3Mi1iMDdmLWJmNTE4MTk1MmY1YiJ9.ul9ehGztfIRJM9LwCSnBhxZgmFBhEd6hQ2kRXufbDOe4-J_XueJwU7nkWG0SJlCoMuXzOTw05GcZ7AtO502CYhZ3TtTUxSlFRfwYC_hPLPjeqlz_OZKh6-obChW9CQAM2Kpsk4XzuvxYQ1OEkjuWQWsAKuvGCGaADIrY9RutfgU1-BgETS9ro60GA7cs647egCky4uPhC3JXDxtShns07wsPQ3Y6iugugCZjh2sJU1kZEalvTFskR0fOK7H3MY4wURjmiVWH-vDrUx-FF0l9Mys5aWG64B1Zk4fH2pCeHYASTJ-xTAL5HJ8PWuO7L6odXWXm4Q6ag0hg4QwbxZfvzQ",
        }
        
  (todos parametros são obrigatórios)
  
  Respostas:
    
    Success:
      status: 200 OK
      body: {
        "id": "411570eb-09b9-41e4-a271-3bbe1a4fcca5",
        "conversation": {
            "id": "0e4a4c93-dd6f-4440-929a-3f22fb1c7d3f",
            "selfUri": "/api/v2/conversations/0e4a4c93-dd6f-4440-929a-3f22fb1c7d3f"
        },
        "sender": {
            "id": "2f999537-c4ad-475d-bd95-3d38a814cd46"
        },
        "timestamp": "2020-08-05T13:10:35.673Z"
      }
            
     Error:
      status: 400 BadRequest (Parametro conversationId vazio)
      body: [
              {
                  "location": "body",
                  "param": "conversationId",
                  "msg": "Parametro {conversationId} é obrigatório",
                  "value": ""
              }
            ]
    
      status: 400 BadRequest (Parametro memberId vazio)
      body: [
              {
                  "location": "body",
                  "param": "memberId",
                  "msg": "Parametro {memberId} é obrigatório",
                  "value": ""
              }
            ]
            
      status: 400 BadRequest (Parametro token vazio)
      body: [
              {
                  "location": "body",
                  "param": "token",
                  "msg": "Parametro {token} é obrigatório",
                  "value": ""
              }
            ]
      
      status: 400 BadRequest (Parametro msg vazio)
      body: [
              {
                  "location": "body",
                  "param": "msg",
                  "msg": "Parametro {msg} é obrigatório",
                  "value": ""
              }
            ]
      
      status: 400 BadRequest (Parametro bodyType vazio)
      body: [
              {
                  "location": "body",
                  "param": "bodyType",
                  "msg": "Parametro {bodyType} é obrigatório",
                  "value": ""
              }
            ]
