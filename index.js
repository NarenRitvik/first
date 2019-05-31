'use strict';
var attachments ={values:[]}
var output = process.argv[3];
var fs = require("fs");
var lines = new Array();
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2], {
        encoding: 'utf8'
    })
  });


  lineReader.on('line', function (line) {
    lines.push(line.toString());
   });
  lineReader.on('close', () => {
        
        function getId() {
            // Alphanumeric characters
            const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let autoId = '';
            for (let i = 0; i < 20; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            //assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
            return autoId;
        }
        
        var  qwer = {
                "__collections__": { "attachments": { 
                }
            }
            }


        lines.forEach(function (line){
        var eachdata = line.split('\t');
        console.log(eachdata);
        var uid = getId();
            var inner =  {
            
            "id": eachdata[0],
            "url": eachdata[1],
            "title": eachdata[4],
            "__collections__":{}  
       }
             qwer.__collections__.attachments[uid]=inner;
       })
       console.log(JSON.stringify(qwer));
  
  
      fs.writeFile(output,JSON.stringify(qwer),function (err){
          if(err){
              console.log(err);
              return;
          }
      });      
    })