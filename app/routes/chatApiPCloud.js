var purecloudCreateModel = require('../models/PureCloud/CreateChat')
var purecloudSendMsgModel = require('../models/PureCloud/SendMsgChat')
var purecloudSendTypingModel = require('../models/PureCloud/SendTypingChat')
var purecloudFinalyzeModel = require('../models/PureCloud/FinalyzeChat')
var purecloudGetQueueUsers = require('../models/PureCloud/GetQueueUsers')

module.exports = function (application) {
    
    application.get('/coddera-widget', function (req, res) {

        res.render("coddera-widget");

    });

    application.get('/chat-widget', function (req, res) {

        res.render("chat-widget");

    });

    application.post('/coddera-widget/chat/create', function (req, res) {
        req.assert('name', 'Parametro {name} é obrigatório').notEmpty();
        req.assert('phone', 'Parametro {phone} é obrigatório').notEmpty();
        req.assert('email', 'Parametro {email} é obrigatório').notEmpty();
        req.assert('email', 'Parametro {question} é obrigatório').notEmpty();

        var error = req.validationErrors();

        if(error){
            res.status(400).json(error);
        }

        purecloudCreateModel.createChat(req, res, function(resp){
            //var objReturn = JSON.parse(resp)
            res.status(resp.status).json(resp);
        });
    });

    application.post('/coddera-widget/chat/send', function (req, res) {
        req.assert('conversationId', 'Parametro {conversationId} é obrigatório').notEmpty();
        req.assert('memberId', 'Parametro {memberId} é obrigatório').notEmpty();
        req.assert('token', 'Parametro {token} é obrigatório').notEmpty();
        req.assert('msg', 'Parametro {msg} é obrigatório').notEmpty();
        req.assert('bodyType', 'Parametro {bodyType} é obrigatório').notEmpty();

        var error = req.validationErrors();

        if(error){
            res.status(400).json(error);
        } else {
            purecloudSendMsgModel.sendMsg(req, res, function(resp){
                res.status(resp.statusCode).json(resp);
            });
        }

    });

    application.post('/coddera-widget/chat/send-typing', function (req, res) {
        req.assert('conversationId', 'Parametro {conversationId} é obrigatório').notEmpty();
        req.assert('memberId', 'Parametro {memberId} é obrigatório').notEmpty();
        req.assert('token', 'Parametro {token} é obrigatório').notEmpty();
        
        var error = req.validationErrors();

        if(error){
            res.status(400).json(error);
        } else {
            purecloudSendTypingModel.sendTyping(req, res, function(resp){
                res.status(resp.statusCode).json(resp);
            });
        }

    });

    application.delete('/coddera-widget/chat/finalyze', function (req, res) {
        req.assert('conversationId', 'Parametro {conversationId} é obrigatório').notEmpty();
        req.assert('memberId', 'Parametro {memberId} é obrigatório').notEmpty();
        req.assert('token', 'Parametro {token} é obrigatório').notEmpty();
        
        var error = req.validationErrors();

        if(error){
            res.status(400).json(error);
        } else {
            purecloudFinalyzeModel.finalyze(req, res, function(resp){
                res.status(resp.statusCode).json(resp);
            });
        }

    });

    application.get('/coddera-widget/chat/queue/users', function (req, res) {
        purecloudGetQueueUsers.getQueueUsers(req, res, function(resp){
            res.status(resp.statusCode).json(resp);
        });
    });
};