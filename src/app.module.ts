import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.AP_DB_HOST,
      database: process.env.AP_DB_NAME,
      port: +process.env.AP_DB_PORT,
      username: process.env.AP_DB_USER,
      password: process.env.AP_DB_PASSWORD,
      autoLoadEntities: true, /** Se sincroniza todo al hacer cambios en base de datos*/
      synchronize: true
    
    }),
    PostsModule,
    UserModule],
  controllers: []
})
export class AppModule {}
