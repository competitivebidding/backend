import { Injectable } from '@nestjs/common'

@Injectable()
export class ErrorHandlerService {
    async errorHandler(error: string) {
        throw new Error(error)
    }
}
