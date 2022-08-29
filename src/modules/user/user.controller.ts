import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleType } from 'src/constants';
import { Auth } from 'src/decorators';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user',
    type: UserDto,
  })
  getUser(@Param('id', ParseIntPipe) userId: number): Promise<UserDto> {
    return this.userService.getUser(userId);
  }

  @Put(':id')
  @Auth([RoleType.USER])
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user information',
  })
  @UseInterceptors(FileInterceptor('avatar'))
  updateUser(@Param('id', ParseIntPipe) userId: number): Promise<void> {}
}
