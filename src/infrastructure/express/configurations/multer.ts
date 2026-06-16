/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request } from 'express';
import multer from 'multer';
import path from 'node:path';
import { BaseApiError } from '../../../common/api-erros/base-api-error';
import { HttpResponse } from '../../../application/response';
import { appStatusCode } from '../../../common/app-status-code';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
//     const fileName = uniqueName + path.extname(file.originalname);
//     cb(null, fileName);
//   },
// });

const allowedExtension: string[] = ['.jpeg', '.jpg', '.png'] as const;
const allowedMimetypes: string[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
] as const;

const fileFilter = (req: Request, file: any, cb: any) => {
  const extname = path.extname(file.originalname).toLowerCase();
  const validExtension = allowedExtension.includes(extname);
  const validMimetype = allowedMimetypes.includes(file.mimetype);
  if (!validExtension || !validMimetype) {
    const httpError = HttpResponse.error(
      'TYPE_FILE_NOT_SUPPORTED',
      'type file not supported',
    );
    return cb(
      new BaseApiError(httpError, appStatusCode.typeFileNotSupported.status),
    );
  }
  return cb(null, true);
};

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});
