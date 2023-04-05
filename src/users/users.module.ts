import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersService, PrismaService, AuthService, JwtService, AuthGuard, UsersResolver],
  controllers: [UsersController],
})
export class UsersModule {}
