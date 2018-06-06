import cloudform, { S3 } from 'cloudform';

export default cloudform({
  Description: 'My template',
  Parameters: {},
  Mappings: {},
  Resources: {
    S3: new S3.Bucket({
      BucketName: 'simenyan-ta',
    }),
  },
  Outputs: {},
});
