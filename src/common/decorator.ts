import { SetMetadata } from '@nestjs/common';

export function AllowAnonymous() {
  return SetMetadata('AllowAnonymous', true);
}
