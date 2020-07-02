#How to dpeloy

1. Run `npm install` & `npm run build` common (backend/src/common/repo)
2. Run `npm install` in all lambdas (backend/src)
3. Run `npm install` & `npm run deploy` in backend folder
4. Run `npm install` & `npm run build` in frontend folder
5. Run `aws s3 cp build s3://$bucketname --recursive` in frontend folder where $bucketname is an output dom backend deploy
