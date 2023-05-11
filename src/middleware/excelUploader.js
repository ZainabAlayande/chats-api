
const multer = require("multer");
const excelFilter = (req, file, cb) => {
    if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
        cb(null, true);
    } else {
        cb("Please upload only excel file.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/beneficiaries/excel/upload");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-chats-beneficiaries-${file.originalname}`);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;