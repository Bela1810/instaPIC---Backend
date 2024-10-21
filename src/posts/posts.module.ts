import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({     /** ?: Significa que es opcional */
    controllers: [PostsController],
    providers: [PostsService],
  })
export class PostsModule{}