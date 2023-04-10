import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthGuard } from './auth/auth.guard'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { PrismaService } from './database/prisma.service'
import { UsersModule } from './users/users.module'
import { AuctionsResolver } from './auctions/auctions.resolver';
import { AuctionsService } from './auctions/auctions.service';
import { AuctionModule } from './auction/auction.module';
import { AuctionsModule } from './auctions/auctions.module';

@Module({
    imports: [
        UsersModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/grachql-schema.gql'),
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        AuthModule,
        AuctionModule,
        AuctionsModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, AuthService, AuthGuard, AuctionsResolver, AuctionsService],
})
export class AppModule {}
