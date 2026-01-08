import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AppRequest} from './app-request';
import {v4 as uuid} from 'uuid';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<AppRequest>();
    if (request.headers['x-request-id']) {
      request.requestId = request.headers['x-request-id'] as string;
    } else {
      request.requestId = uuid();
    }
    return next.handle();
  }
}
