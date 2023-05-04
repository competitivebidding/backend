import { MailerService as NestMailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
    constructor(private readonly nestMailerService: NestMailerService, private readonly configService: ConfigService) {}

    async sendForgotPasswordEmail(userEmail: string, confirmationCode: string): Promise<void> {
        await this.nestMailerService
            .sendMail({
                transporterName: 'mail',
                to: userEmail,
                subject: 'Please confirm', //text for tests
                template: 'verify-code', //text for tests
                context: {
                    confirmationCode: confirmationCode, //for hbs data-context
                },
            })
            .then(() => {
                console.log('Email sent')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
