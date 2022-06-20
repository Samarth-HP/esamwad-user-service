import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import got from 'got/dist/source';
import { AuthModule } from '../auth/auth.module';
import { UCIController } from './uci.controller';
import { FusionauthService } from './fusionauth/fusionauth.service';
import { OtpService } from './otp/otp.service';
import { GupshupService } from './sms/gupshup/gupshup.service';
import { SmsService } from './sms/sms.service';
import { UCIService } from './uci.service';

describe('UCIController', () => {
  let controller: UCIController;
  let fusionauthService: FusionauthService;
  let otpService: OtpService;
  let smsService: SmsService;
  let uciService: UCIService;

  beforeEach(async () => {
    const gupshupFactory = {
      provide: 'OtpService',
      useFactory: () => {
        return new GupshupService(
          'testUsername',
          'testPassword',
          'testBaseUrl',
          got,
        );
      },
      inject: [],
    };

    const otpServiceFactory = {
      provide: OtpService,
      useFactory: () => {
        return new OtpService(gupshupFactory.useFactory());
      },
      inject: [],
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UCIController],
      imports: [HttpModule, AuthModule],
      providers: [FusionauthService, otpServiceFactory, SmsService, UCIService],
    }).compile();

    controller = module.get<UCIController>(UCIController);
    fusionauthService = module.get<FusionauthService>(FusionauthService);
    otpService = module.get<OtpService>(OtpService);
    smsService = module.get<SmsService>(SmsService);
    otpService = module.get<OtpService>(OtpService);
    uciService = module.get<UCIService>(UCIService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    // expect(controller.sendOTP("")).toBeDefined();
    // expect(controller.loginOrRegister("", "", "", "", "")).toBeDefined();
  });
});
