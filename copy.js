// this script will copy an existing module within the src directory
// and will also rename labels

const fse = require('fs-extra');
const fs = require('fs')

const srcDir = `websites`;
const destDir = `charges`;
const srcFile = `website`;
const destFile = `charge`;
const srcFileUpper = `Website`;
const destFileUpper = `Charge`;
                              
// copy entire directory  
fse.copySync(`src/${srcDir}`, `src/${destDir}`);
console.log('copied directory: ', `src/${srcDir} -> src/${destDir}`)

// loop through entire module folder
fs.readdirSync(`src/${destDir}`).forEach(file => {
  if (file.includes('.ts')) {
    // rename files
    let searchRegExp = srcDir;
    let replaceWith = destDir;
    let newFile = file.replace(searchRegExp, replaceWith);
    fs.rename(`src/${destDir}/${file}`, `src/${destDir}/${newFile}`, (err) => {
      if (err) throw err;
      console.log('renamed: ', file, newFile)
      replaceStringInFile(`src/${destDir}/${newFile}`)
    });
  } else {
    // subdirectories of module folder
    fs.readdirSync(`src/${destDir}/${file}`).forEach(subfile => {
      if (subfile.includes('.ts')) {
        // rename files
        let searchRegExp = srcFile;
        let replaceWith = destFile;
        let newSubfile = subfile.replace(searchRegExp, replaceWith);
        fs.rename(`src/${destDir}/${file}/${subfile}`, `src/${destDir}/${file}/${newSubfile}`, (err) => {
          if (err) throw err;
          console.log('renamed: ', subfile, newSubfile)
          replaceStringInFile(`src/${destDir}/${file}/${newSubfile}`)
        });
      }
    })
  }  
});

// rename key labels in files
function replaceStringInFile (someFile) {
  fs.readFile(someFile, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var re2 = new RegExp(srcFile, "g");
    var re3 = new RegExp(srcFileUpper, "g");
    var result1 = data.replace(re2, destFile);
    var result2 = result1.replace(re3, destFileUpper);
  
    fs.writeFile(someFile, result2, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
  
}