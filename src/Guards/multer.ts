import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid'; // A utility for generating unique names
import * as fs from 'fs';

@Injectable()
export class FileService {
  // Function to handle file upload
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadPath = './uploads'; // Define your upload directory
    const fileName = `${uuidv4()}${extname(file.originalname)}`; // Generate a unique filename
    const filePath = `${uploadPath}/${fileName}`;

    // Save the file manually
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Create the directory if it doesn't exist
    }
    fs.writeFileSync(filePath, file.buffer); // Save the file

    return filePath; // Return the file path to be stored in the DB
  }
}

