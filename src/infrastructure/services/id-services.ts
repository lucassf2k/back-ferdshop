import { v7 as UUIDV7 } from 'uuid';
import type { UUIDServiceProtocol } from '../../domain/protocols/uuid-service-protocol';

export class UUIDService implements UUIDServiceProtocol {
  getV7(): string {
    return UUIDV7();
  }
}

export const getUUIDV7 = (): string => new UUIDService().getV7();
