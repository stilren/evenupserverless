Setup stolen from https://github.com/danielzotti/aws-lambda-layers-test

Build the repo package to dest/nodejs/repo and copy over the repo package.json there - this will be the layer (and is a complete ts npm package).
Refer to it in a lambda

To deploy
- npm run build (in this folder)