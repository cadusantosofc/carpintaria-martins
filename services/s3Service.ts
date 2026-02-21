
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const S3_CONFIG = {
  enabled: true,
  accessKey: "bEdNzDubgMwOfT2K",
  secretKey: "Taa76dqWKJS4en1Jhv82ERllmwOJngD5",
  bucket: "carpintaria",
  endpoint: "https://s3.galaxychat.com.br",
  region: "us-east-1"
};

const s3Client = new S3Client({
  endpoint: S3_CONFIG.endpoint,
  region: S3_CONFIG.region,
  credentials: {
    accessKeyId: S3_CONFIG.accessKey,
    secretAccessKey: S3_CONFIG.secretKey,
  },
  forcePathStyle: true,
});

const CONFIG_FILE_KEY = "martins-cms-config.json";

export const uploadToS3 = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  try {
    const arrayBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: S3_CONFIG.bucket,
      Key: fileName,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type,
    });
    await s3Client.send(command);
    return `${S3_CONFIG.endpoint}/${S3_CONFIG.bucket}/${fileName}`;
  } catch (error) {
    console.error("Erro no upload S3:", error);
    throw new Error("Falha ao enviar imagem.");
  }
};

export const saveConfigToS3 = async (data: any): Promise<void> => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const command = new PutObjectCommand({
      Bucket: S3_CONFIG.bucket,
      Key: CONFIG_FILE_KEY,
      Body: jsonString,
      ContentType: "application/json",
    });
    await s3Client.send(command);
  } catch (error) {
    console.error("Erro ao salvar config no S3:", error);
    throw error;
  }
};

export const loadConfigFromS3 = async (): Promise<any | null> => {
  try {
    const command = new GetObjectCommand({
      Bucket: S3_CONFIG.bucket,
      Key: CONFIG_FILE_KEY,
    });
    const response = await s3Client.send(command);
    
    if (response.Body) {
      const str = await response.Body.transformToString();
      return JSON.parse(str);
    }
    return null;
  } catch (error: any) {
    if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
      return null;
    }
    console.error("Erro ao carregar do S3:", error);
    return null;
  }
};
