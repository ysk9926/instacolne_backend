import * as AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: String(process.env.AWS_KEY),
    secretAccessKey: String(process.env.AWS_SECRET),
  },
});

const s3 = new AWS.S3();

export const awsPhotoUpload = async (
  file: any,
  userId: number,
  foldername: string
) => {
  const {
    file: { filename, createReadStream },
  } = await file;
  const readStream = createReadStream();
  const objectName = `${foldername}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone-upload-seung",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  console.log(filename);
  return Location;
};

export const awsPhotoDelete = async (fileUrl: string, foldername: string) => {
  const decodedUrl = decodeURI(fileUrl);
  const filePath = decodedUrl.split(`/${foldername}/`)[1];
  const fileName = `${foldername}/${filePath}`;

  await s3
    .deleteObject({
      Bucket: "instaclone-upload-seung",
      Key: fileName,
    })
    .promise();
};
