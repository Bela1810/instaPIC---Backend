import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [],
})
export class AppModule {}
