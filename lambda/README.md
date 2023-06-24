## Implement Lambda Functions using AWS Console

A lambda function has been created with the AWS Management Console.
A simple Node JS handler and related node_modules have been packaged in a .zip file a uploaded to the lambda.

## Implement Lambda Functions using AWS CLI

> All file references can be found in the _lambda_ directory.

To create a Lambda Function via CLI, the following steps have been followed.

- A JSON document (_trust_policy.json_) outlining the trust policy for the new lambda has been created.
- A custom 'museum-role' execution role has been created with the following command:

```shell
aws iam create-role --role-name my-role --assume-role-policy-document file://lambda_trust_policy.json
```

- The managed _AWSLambdaBasicExecutionRole_ policy has been attached to the new role with:

```shell
aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole --role-name museum-role
```

- A deployment package (_deployment.zip_) is created to be deployed to for the lambda function creation.
- A new lambda function is created with the previously created deployment package and execution role with the following command.

```shell
aws lambda create-function --function-name BookMuseum --handler index.handler --memory-size 128 --runtime nodejs18.x --role arn:aws:iam::237291935917:role/museum-role --timeout 3 --zip-file fileb://deployment.zip --publish

```

## Catch Errors in Lambda Functions

Two custom JavaScript errors (such as InvalidInputError and TransientError) have been created. The syntax is similar to this:

```JavaScript
function CustomError(message) {
this.name = 'CustomError';
this.message = message;
}
CustomError.prototype = new Error();
```

The response have been filtered based on the status code returned by the third-party API:
If the return code is 200 , the JSON body has been returned. If the return code is 418 , an InvalidInputError is thrown.
If the return code is 503, a TransientError is thrown.
Otherwise throw a generic Error.

The updated can be found on related Lambda handler projects

## Create the Order Receipt and save it to S3

A new Lambda function, _InvoicingBuilderFunction_, has been created along with related _InvoicingRole_ to generate the order receipt from the OrderCompleted SNS Topic and save it to S3.
You can find the related code in _build-invoice_ directory.
