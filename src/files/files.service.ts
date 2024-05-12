import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from "node:path";
import * as fs from "node:fs";
import * as uuid from "uuid"

@Injectable()
export class FilesService {

    async createFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}