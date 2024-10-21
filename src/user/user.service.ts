import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { profile } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

constructor(
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
  private jwtService: JwtService ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const {password, ...newUser} = createUserDto; /**Separar en dos variables */

      const userDB = this.userRepository.create({
        password: bcryptjs.hashSync(password),
        ...newUser
    });  
      const {password:_, isActive:__,...userAdded} = await this.userRepository.save(userDB); /**Guarda el usuario, retorna una promesa, es asincrono */ 
      return userAdded;  /**En el guion bajo se guarda el usuario */

    }catch(error){
      if(error.code === '23505'){
        throw new BadRequestException(error.detail)
      }
      console.log(error)
      throw new InternalServerErrorException('Error inesperado')
    }
  }

  async login(loginUser: LoginUserDto) {
      const {password, username} = loginUser;
      const user = await this.userRepository.find({
        where:{username}
      })
      if(user.length ===0){
        throw new NotFoundException('User not found')
      }
  
      const isValid = bcryptjs.compareSync(password, user[0].password)
  
      if(!isValid){
        throw new ForbiddenException('Error Password')
      }

      this.jwtService.verify
      return {
        name: user[0].name,
        profileImage: user[0].profileImage,
        username: user[0].username,    /**JSON a string */
        token: this.jwtService.sign({user:user[0].username, id:user[0].id})
      };
      
    }

  async findAll() {
    const result= await this.userRepository.find({where:{isActive:true}});
    return result.map(item =>{
      const {password, ...user} = item;
      return user
    })

  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
