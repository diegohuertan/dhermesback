const app = require('../firebase'); // Asume que el código de inicialización está en firebase.js
const { getStorage, ref, uploadBytes } = require("firebase/storage");

// Obtiene una instancia de Firebase Storage
const storage = getStorage(app);

async function uploadToFirebase(file, filename) {
    const imageRef = ref(storage, `images/${filename}`);
    // Sube el archivo a Firebase Storage
    await uploadBytes(imageRef, file.buffer);
    console.log(`Archivo subido exitosamente a ${storage.bucket}/images/${filename}`);
}

exports.uploadImage = async (req, res) => {
    console.log("Request body:", req.body); // Muestra el cuerpo de la solicitud
    console.log("Request files:", req.files); // Muestra todos los archivos en la solicitud
    console.log("Request file:", req.file); // Muestra el archivo específico (si se espera uno)

    try {
        if (!req.file) {
            console.log("No file uploaded with the request."); // Confirma si realmente no se subió un archivo
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        // Usa el nombre de la imagen del parámetro de ruta o genera un nombre único
        const filename = req.params.imageName || uuidv4();
        console.log(`Filename determined for upload: ${filename}`); // Muestra el nombre de archivo determinado para la subida

        await uploadToFirebase(req.file, filename);
        console.log(`File uploaded successfully to ${storage.bucket}/images/${filename}`); // Confirma la subida exitosa
        res.status(201).json({ message: `Archivo subido exitosamente a ${storage.bucket}/images/${filename}` });
    } catch (error) {
        console.error("Error uploading file:", error); // Muestra el error si la subida falla
        res.status(500).json({ error: error.message });
    }
};