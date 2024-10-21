import { Injectable } from "@nestjs/common";

@Injectable()    /*Para que se pueda color un constructor*/
export class PostsService{

    posts= [];

    findAll(){
        return this.posts;
    }

    findByid(id:string){
        return this.posts.find(post=>post.id===id);

    }

    createPost(request){
        this.posts = [...this.posts, request];

    }

    updatePost(id:string, request){
        this.posts = this.posts.map(post =>
            post.id === id
            ? {...post,...request}
            :post
        )
    }

    deletePost(id:string){
        this.posts = this.posts.filter(post=> post.id!==id)
    }

}