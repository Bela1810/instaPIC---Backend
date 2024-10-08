import { Body, Controller, Get, Param, Post, Query, Req } from "@nestjs/common";



@Controller('post')
export class PostController{

    posts =[];

    @Get()
    findPost(@Query() query){
        console.log(query)
        return this.posts.find((item)=>item.id === query.id)

    }

    @Get()
    getAllPosts(){
        return this.posts;

    }

    @Post()
    createPost(@Body() request){
        this.posts.push(request);
        console.log(request);

    }

}