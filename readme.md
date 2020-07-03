# What is this?
This is an web app to split costs among friends that does not require log in. It consists of a react app (written a long time ago) with a serverless backend using CDk.

Its hosted here: https://evenup.wassberg.net/

# How to dpeloy

1. Run `npm install` & `npm run build` common (backend/src/common/repo)
2. Run `npm install` in all lambdas (backend/src)
3. Run `npm install` & `npm run deploy` in backend folder
4. Run `npm install` & `npm run build` in frontend folder
5. Run `aws s3 cp build s3://$bucketname --recursive` in frontend folder where $bucketname is an output dom backend deploy
