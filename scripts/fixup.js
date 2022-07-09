const fs = require('fs');
const path = require('path');

// https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html

const packageTypes = [ 
  {
    type: 'commonjs',
    path: 'cjs',
  },
  {
    type: 'module',
    path: 'mjs',
  },
];

try {
  for (let i = 0; i < packageTypes.length; i++) {
    const package = { type: packageTypes[i].type };
    const contents = JSON.stringify(package, 0, 2) + '\n';
    const packagePath = path.join(__dirname, '..', 'dist', packageTypes[i].path, 'package.json');

    fs.writeFileSync(packagePath, contents, { flag: 'w+'});
  }
  // file written successfully
} catch (err) {
  console.error(err);
}
