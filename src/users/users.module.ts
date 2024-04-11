import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      secret: 'WARYAAHE@#$%&*()hooyada canab',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [UsersService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UsersModule { }
