const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Configura tus credenciales
const s3Client = new S3Client({
    region: 'us-east-2', // Ejemplo: 'us-west-2'
    credentials: {
        accessKeyId: 'AKIA47CRWDSTGDRFBJOU',
        secretAccessKey: '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'
    }
});

async function uploadToS3(file, bucket, key) {
    // Usa el buffer del archivo subido
    const fileContent = file.buffer;

    // Parámetros para la subida
    const params = {
        Bucket: bucket,
        Key: key, // Incluye 'images/' antes del nombre del archivo
        Body: fileContent,
        ContentType: file.mimetype, // Usa el tipo de archivo del archivo subido
    };

    // Subir el archivo a S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(`Archivo subido exitosamente a ${params.Bucket}/images/${params.Key}`);
}

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({error: 'No file uploaded'});
            return;
        }
        // Usa el nombre de la imagen del parámetro de ruta
        const filename = req.params.imageName;
        await uploadToS3(req.file, 'dhermesbucket', `images/${filename}`);
        res.status(201).json({message: `Archivo subido exitosamente a dhermesbucket/images/${filename}`});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};