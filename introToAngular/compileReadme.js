// This script compiles README_template.md 
// into README.md by
//
//  * compiling metadata about examples 
//  * dynamically generating a markdown list of example entries
//  * injecting the list into the template
//
//  Curran Kelleher 3/2/2014
var _ = require('underscore'),
    fs = require('fs'),
    inputFile = './README_template.md',
    outputFile = './README.md',
    entryDir = 'examples/',
    snapshotsPath = entryDir + 'snapshots/',
    entryTemplate = _.template(' * [<%= name %>](./examples/<%= name %>)<%= message %>');

// Read the template for README.md
fs.readFile(inputFile, 'utf8', function (err, template) {

  // Generate the model for the README.md template.
  var model = generateTemplateModel(entryTemplate),

      // Evaluate the README.md template.
      output = _.template(template, model);

  // Write README.md
  fs.writeFile(outputFile, output, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Wrote '" + outputFile + "'!");
    }
  }); 
});

function generateTemplateModel(){
  
  var files = fs.readdirSync(snapshotsPath),
      entries = files.map(function(file){
        return { name: file, message: getMessage(file) };
      });

  return { examples: entries.map(entryTemplate).join('\n') };
}
function getMessage(file){
  var msgFile = snapshotsPath + file + '/message.txt';
  if(fs.existsSync(msgFile)){
    var msg = fs.readFileSync(msgFile, 'utf8');
    return ' - ' + msg.replace('\n','');
  }
  return '';
}