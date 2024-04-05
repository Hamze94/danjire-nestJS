import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }


  @Get('/')
  async fetchAllUsers() {
    return await this.userService.findAll()
  }
  @Put('/:id/update')
  async updateUser(@Param('id') id, @Body() updatedUser) {
    return this.userService.upate(id, updatedUser);
  }
}

