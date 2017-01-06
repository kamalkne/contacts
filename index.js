var fs = require('fs');
var vcard = require('vcard-json');

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
