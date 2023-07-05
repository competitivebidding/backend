import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AccessTokenGuard, RolesGuard } from './auth/guards'
import { ChatModule } from './chat/chat.module'
import { PrismaService } from './database/prisma.service'
import { MailModule } from './mail/mail.module'
import { MailService } from './mail/mail.service'
import { MemberModule } from './member/member.module'
import { NewsModule } from './news/news.module'
import { NewsService } from './news/news.service'
import { NotificationModule } from './notification/notification.module'
import { TradeModule } from './trade/trade.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MemberModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            subscriptions: {
                'graphql-ws': true,
                'subscriptions-transport-ws': true,
            },
            autoSchemaFile: join(process.cwd(), 'src/grachql-schema.gql'),
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        EventEmitterModule.forRoot(),
        AuthModule,
        NewsModule,
        MailModule,
        ChatModule,
        TradeModule,
        NotificationModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        { provide: APP_GUARD, useClass: AccessTokenGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
        NewsService,
        MailService,
    ],
})
export class AppModule {}
