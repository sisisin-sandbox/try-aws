import cloudform, { DeletionPolicy, S3, Fn } from 'cloudform';
import { Ref } from 'cloudform/types/functions';

export default cloudform({
  Description: 'My template',
  Parameters: {},
  Mappings: {},
  Resources: {
    FrontHosting: new S3.Bucket({
      BucketName: 'simenyan-ta',
      WebsiteConfiguration: { ErrorDocument: 'index.html', IndexDocument: 'index.html' },
      AccessControl: 'PublicRead',
    }).deletionPolicy(DeletionPolicy.Retain),
    BucketPolicy: new S3.BucketPolicy({
      Bucket: Ref('FrontHosting'),
      PolicyDocument: {
        Id: 'MyPolicy',
        Statement: [
          {
            Sid: 'PublicReadForGetBucketObjects',
            Effect: 'Allow',
            Principal: '*',
            Action: 's3:GetObject',
            Resource: Fn.Join('', ['arn:aws:s3:::', Ref('FrontHosting'), '/*']),
          },
        ],
      },
    }),
  },
  Outputs: {},
});
