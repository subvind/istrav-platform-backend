const fse = require('fs-extra');
const fs = require('fs')

const srcDir = `members`;
const destDir = `users`;
const srcFile = `member`;
const destFile = `user`;
                              
// copy entire directory  
fse.copySync(`src/${srcDir}`, `src/${destDir}`);
console.log('copied directory: ', `src/${srcDir} -> src/${destDir}`)

// rename all files to new names
fs.readdirSync(`src/${destDir}`).forEach(file => {
  if (file.includes('.ts')) {
    let searchRegExp = srcDir;
    let replaceWith = destDir;
    let newFile = file.replace(searchRegExp, replaceWith);
    fs.rename(`src/${destDir}/${file}`, `src/${destDir}/${newFile}`, (err) => {
      if (err) throw err;
      console.log('renamed: ', file, newFile)
    });
  }

  
});