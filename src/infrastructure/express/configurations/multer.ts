/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from 'node:path';
import { BaseApiError } from '../../../common/api-erros/base-api-error';
import { HttpResponse } from '../../../application/response';
import { appStatusCode } from '../../../common/app-status-code';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
    const fileName = uniqueName + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const ALLOWED_TYPES = /jpeg|jpg|png|pdf/;

const fileFilter = (req: any, file: any, cb: any) => {
  const extname = ALLOWED_TYPES.test(
    path.extname(file.originalname).toLowerCase(),
  );
  if (!extname) {
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

const LIMIT_SIZE_MB = 1024 * 1024 * 5; // 5MB

export const upload = multer({
  storage,
  limits: { fileSize: LIMIT_SIZE_MB },
  fileFilter,
});
