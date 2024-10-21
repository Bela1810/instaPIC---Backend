import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { PostsService } from "../posts/posts.service";



@Controller('post')
export class PostsController{

    constructor(private readonly postService:PostsService){}


    @Get()
    findAll(){
        return this.postService.findAll();

    }

    @Get(':id')
    findByid(@Param('id') id:string){
        return this.postService.findByid(id);

    }

    @Post()
    createPost(@Body() request){
        this.postService.createPost(request)

    }

    @Put()
    updatePost(@Param('id') id:string,  @Body() request){
        this.postService.updatePost(id, request);
    }

    @Delete()
    deletePost(@Param('id') id:string){
        this.postService.deletePost(id);
    }


}