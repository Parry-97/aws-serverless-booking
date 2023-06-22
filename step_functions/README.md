## Simplest Step Functions

A new role has been created with the following command:

```shell
aws iam create-role --role-name step-role --assume-role-policy-document file://step_trust_policy.json
```

The managed _AWSLambdaRole_ policy has been attached to the new role with:

```shell
aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaRole --role-name step-role
```

A new step function _OrderWorkflow_ has been created with the AWS Management Console.

**NOTE** Express Workflows don't record execution history in AWS Step Functions.
In order to enabled this a new policy was created and attached to the _step-role_ role with the following command:

```shell
aws iam attach-role-policy --policy-arn arn:aws:iam::xxxxxxx:policy/log_access --role-name step-role
```

You can find the state machine definition in the _order_workflow_definition.json_ file.
