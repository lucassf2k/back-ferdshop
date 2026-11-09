import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';

export enum WeekDaysEnum {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export type BusinessHoursProps = {
  day: WeekDaysEnum;
  hour: string;
  isClosed: boolean;
};

export class BusinessHours extends Entity<BusinessHoursProps> {
  private constructor(id: string, props: BusinessHoursProps) {
    super(id, props);
  }

  static create(props: BusinessHoursProps): BusinessHours {
    const newId = getUUIDV7();
    return new BusinessHours(newId, props);
  }

  static restore(id: string, props: BusinessHoursProps): BusinessHours {
    return new BusinessHours(id, props);
  }
}
