import { Module } from '@nestjs/common';
import { HttpViewModel } from './http-viewmodel';

@Module({
  providers: [HttpViewModel],
  exports: [HttpViewModel],
})
export class CommonModule {}
