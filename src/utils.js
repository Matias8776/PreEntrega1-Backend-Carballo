import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/img`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const uploader = multer({ storage });
export default __dirname;
