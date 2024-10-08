import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]): any => (target: any, key?: string, descriptor?: PropertyDescriptor) => {
  SetMetadata('roles', roles);
};