import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb'
import * as apigateway from '@aws-cdk/aws-apigatewayv2'
import * as s3 from '@aws-cdk/aws-s3'
import * as iam from '@aws-cdk/aws-iam'
import * as lambda from '@aws-cdk/aws-lambda'
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
        blockPublicAccess: new s3.BlockPublicAccess({ restrictPublicBuckets: false })
      });

    websiteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [`${websiteBucket.bucketArn}/*`],
      principals: [new iam.Anyone()]
    }))

    const dynamoTable = new dynamodb.Table(this, 'evenupevents', {
      partitionKey: {
        name: 'eventId',
        type: dynamodb.AttributeType.STRING
      },
      tableName: 'EvenupEventsProd',
    });

    const layer = new lambda.LayerVersion(this, 'MyLayer', {
      code: lambda.Code.fromAsset('src/layers/repo/dist'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_10_X],
      license: 'Apache-2.0',
      description: 'A layer to test the L2 construct',
    });


    const lambdas = [
      { name: "createEvent", verb: apigateway.HttpMethod.POST, route: "/events" },
      { name: "getEvent", verb: apigateway.HttpMethod.GET, route:"/events/{id}" },
      { name: "updateName", verb: apigateway.HttpMethod.PUT, route:"/events/{id}/name" },
    ]

    provisionLambdas(this, lambdas, dynamoTable, httpApi, layer);

   
    new cdk.CfnOutput(this, "GATEWAY_URL", { value: httpApi.url! })
    new cdk.CfnOutput(this, "BUCKET_URL", { value: websiteBucket.bucketWebsiteUrl! })
    new cdk.CfnOutput(this, "REGION", { value: cdk.Aws.REGION! })
  }
}

function provisionLambdas(stack: cdk.Construct, lambdas: ILambda[], dynamoTable: dynamodb.Table, httpApi: apigateway.HttpApi, layer: lambda.LayerVersion) {
  lambdas.forEach(l => {
    const handler = new lambda.Function(stack, l.name, {
      code: new lambda.AssetCode(`src/${l.name}`),
      handler: `${l.name}.handler`,
      runtime: lambda.Runtime.NODEJS_10_X,
      layers: [layer],
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
