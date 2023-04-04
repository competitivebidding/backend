import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersService, PrismaService, UsersResolver],
  controllers: [UsersController],
})
export class UsersModule {}
