var fs = require('fs');
var vcard = require('vcard-json');
var express = require('express');
var busboy = require('connect-busboy');
var path = require('path');


var app = express();
var port = process.env.PORT || 8080;

app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);
console.log('Server started! At http://localhost:' + port);

function vcfTo (vcfFile) {
    this.vcfFile = vcfFile;
}

vcfTo.prototype.parseVcf = function() {
    fs.readFile(this.vcfFile, function( err, data ) {
        if ( err )
            console.log( err );
        else {
            var card = vCard.parse( data )
            console.log(card);
        }
    });
}

vcfTo.prototype.readVcf = function() {
    vcard.parseVcardFile(this.vcfFile, function(err, data){
        if (err)
            console.log('oops:'+ err);
        else {
            contacts = data;
            data = JSON.stringify(data);
            fs.writeFile('vcfJson.json', data, function( err, data ) {
                if (err)
                    console.log(err);
                else
                    console.log('File saved');
            });
        }
    });
}

var v = new vcfTo('Contacts.vcf');
v.readVcf();


app.route('/postvcf')
    .post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('back');           //where to go next
            });
        });
    });

app.post('/postvcf', function( req, res ) {

})
