import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload-single-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('/upload-multiple-files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultipleFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('/upload-any-files')
  @UseInterceptors(AnyFilesInterceptor())
  uploadAnyFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('/upload-inside-array')
  @UseInterceptors(AnyFilesInterceptor())
  uploadInsideArray(
    @UploadedFile() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log(body);
    console.log(files);
  }
}
