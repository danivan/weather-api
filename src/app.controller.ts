import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAuthGuard } from './auth/utils/Guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
