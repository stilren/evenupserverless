# Serverless-CDK-React
This is a serverless application with a react front end. Backend is provisioned and deployed with cdk using python.

# How to deploy
1. Install [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) & [cdk]( https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install)
2. Install backend dependencies
    ```
        cd backend
        pip install -r requirements.txt
    ```
3. Install frontend dependencies
    ```
        cd frontend
        npm install
    ```
4. Run init (bash)
    ```
        chmod +x ./init
        ./init
    ```
    This will deploy the cdk stack to you default account, add the output file to the frontend folder and build and copy the react app to the bucket
5. Go to the bucket url (output from cdk deploy) to check out your app!

Alternatively you could do step 4 manually by
1. In the backend folder run `cdk deploy`
2. In the frontend folder run `npm run build` and then `aws s3 cp build s3://$bucketdomain --recursive` ($bucketdomain is an output from cdk deploy)

# Misc
## Auth
The application has 4 lambdas to manage a dynamo resource, they are protected by a jwt authorizer. All auth uses cognito.
## Http Gateway 
Api gateway type is Http Gateway.
## Amplify
The fronend uses AWS Amplify to handle auth and communication with the backend
## Dynamo schema:
PK = USER#$USERID
SK = NOTE#$NOTEID

# Creds
Creds to serverless-stack (https://serverless-stack.com/) from where I stole the frontend
