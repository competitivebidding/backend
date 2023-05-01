import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuctionsModule } from './auctions/auctions.module'
import { AuctionsResolver } from './auctions/auctions.resolver'
import { AuctionsService } from './auctions/auctions.service'
import { AuthModule } from './auth/auth.module'
import { AccessTokenGuard, RolesGuard } from './auth/guards'
import { BidsModule } from './bids/bids.module'
import { PrismaService } from './database/prisma.service'
import { MemberModule } from './member/member.module'
import { NewsModule } from './news/news.module'
import { NewsService } from './news/news.service'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MemberModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/grachql-schema.gql'),
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        AuthModule,
        NewsModule,
        AuctionsModule,
        BidsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        { provide: APP_GUARD, useClass: AccessTokenGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
        NewsService,
        AuctionsResolver,
        AuctionsService,
    ],
})
export class AppModule {}
