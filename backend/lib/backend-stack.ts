import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb'
import * as apigateway from '@aws-cdk/aws-apigatewayv2'
import * as s3 from '@aws-cdk/aws-s3'
import * as iam from '@aws-cdk/aws-iam'
import * as lambda from '@aws-cdk/aws-lambda'
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import { HttpMethod } from '@aws-cdk/aws-apigatewayv2';

interface ILambda {
  name: string,
  verb: HttpMethod,
  route: string
}

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const httpApi = new apigateway.HttpApi(this, 'HttpProxyApi', {
      corsPreflight: {
        allowHeaders: ['*'],
        allowMethods: [
          apigateway.HttpMethod.POST,
          apigateway.HttpMethod.PUT,
          apigateway.HttpMethod.PATCH,
          apigateway.HttpMethod.DELETE,
          apigateway.HttpMethod.GET,
          apigateway.HttpMethod.OPTIONS,
          apigateway.HttpMethod.HEAD
        ],
        allowOrigins: ['*'],
        maxAge: cdk.Duration.days(10)
      }
    });

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket",
      {
        websiteIndexDocument: "index.html",
        websiteErrorDocument: "index.html",
        blockPublicAccess: new s3.BlockPublicAccess({ restrictPublicBuckets: false })
      });

    websiteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [`${websiteBucket.bucketArn}/*`],
      principals: [new iam.Anyone()]
    }))
    //@ts-ignore
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'MyDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket
          },
          behaviors: [{ isDefaultBehavior: true }],
        }
      ],
      aliasConfiguration: {
        acmCertRef: "arn:aws:acm:us-east-1:142237566316:certificate/3c6a86cb-858f-4dce-b75d-8e27fa08e25b", //Arn to wildcard cert
        names: ["evenup.wassberg.net"]
      },
      errorConfigurations: [{
        errorCode: 403,
        responseCode: 200,
        responsePagePath: "/index.html"
      }]
    });

    const dynamoTable = new dynamodb.Table(this, 'evenupevents', {
      partitionKey: {
        name: 'eventId',
        type: dynamodb.AttributeType.STRING
      },
      tableName: 'EvenupEventsProd',
    });

    const lambdas = [
      { name: "createEvent", verb: apigateway.HttpMethod.POST, route: "/events" },
      { name: "getEvent", verb: apigateway.HttpMethod.GET, route: "/events/{eventId}" },
      { name: "updateName", verb: apigateway.HttpMethod.PUT, route: "/events/{eventId}/name" },
      { name: "createPerson", verb: apigateway.HttpMethod.POST, route: "/events/{eventId}/people" },
      { name: "updatePerson", verb: apigateway.HttpMethod.PUT, route: "/events/{eventId}/people/{personId}" },
      { name: "deletePerson", verb: apigateway.HttpMethod.DELETE, route: "/events/{eventId}/people/{personId}" },
      { name: "createExpense", verb: apigateway.HttpMethod.POST, route: "/events/{eventId}/expense" },
      { name: "updateExpense", verb: apigateway.HttpMethod.PUT, route: "/events/{eventId}/expense/{expenseId}" },
      { name: "deleteExpense", verb: apigateway.HttpMethod.DELETE, route: "/events/{eventId}/expense/{expenseId}" },
    ]

    provisionLambdas(this, lambdas, dynamoTable, httpApi);


    new cdk.CfnOutput(this, "GATEWAY_URL", { value: httpApi.url! })
    new cdk.CfnOutput(this, "BUCKET_URL", { value: websiteBucket.bucketWebsiteUrl! })
    new cdk.CfnOutput(this, "BUCKET_NAME", { value: websiteBucket.bucketName! })
    new cdk.CfnOutput(this, "CLOUDFRONT", { value: distribution.domainName })
  }
}

function provisionLambdas(stack: cdk.Construct, lambdas: ILambda[], dynamoTable: dynamodb.Table, httpApi: apigateway.HttpApi) {
  lambdas.forEach(l => {
    const handler = new lambda.Function(stack, l.name, {
      code: new lambda.AssetCode(`src/${l.name}`),
      handler: `${l.name}.handler`,
      runtime: lambda.Runtime.NODEJS_10_X,
      environment: {
        TABLE_NAME: dynamoTable.tableName,
      }
    });
    dynamoTable.grantReadWriteData(handler);
    httpApi.addRoutes({
      integration: new apigateway.LambdaProxyIntegration({ handler: handler }),
      path: l.route,
      methods: [l.verb]
    })
  })
}
