import multer from 'multer';
//use memory store for efficent handling on cloud 

const storage = multer.memoryStorage() ;

const uploadMiddleware = multer({ storage }) ;

export default uploadMiddleware;