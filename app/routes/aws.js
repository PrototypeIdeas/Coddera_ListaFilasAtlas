var awsUploadS3Model = require('../models/AWS/UploadS3')

module.exports = function (application) {

    application.post('/coddera-widget/aws/uploadS3', function (req, res) {

        req.assert('base64', 'Parametro {base64} é obrigatório').notEmpty();
        req.assert('name', 'Parametro {name} é obrigatório').notEmpty();
        req.assert('type', 'Parametro {type} é obrigatório').notEmpty();
        
        var error = req.validationErrors();

        if(error){
            res.status(400).json(error);
        } else {
            awsUploadS3Model.fileUpload(req, function(resp){
                res.json(resp);
            });
        }

    });
};