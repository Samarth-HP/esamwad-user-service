import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { SignupResponse } from './uci.interface';
import { UCIService } from './uci.service';
import { OtpService } from './otp/otp.service';
import { SMSResponse } from './sms/sms.interface';

@Controller('uci')
export class UCIController {
  constructor(
    private readonly otpService: OtpService,
    private readonly UCIService: UCIService,
  ) {}

  @Get('/sendOTP')
  @SkipThrottle()
  async sendOTP(@Query('phone') phone): Promise<any> {
    const status: SMSResponse = await this.otpService.sendOTP(phone);
    const resp: SignupResponse = await this.UCIService.transformOtpResponse(
      status,
    );
    return { resp };
  }

  // @Throttle(3, 60)
  // @Get('/verifyOTP')
  // async verifyOTP(@Query('phone') phone, @Query('otp') otp): Promise<any> {
  //   const otpStatus: SMSResponse = await this.otpService.verifyOTP({ phone, otp });
  //   const status = otpStatus.status;
  //   const resp: SignupResponse = await this.dstService.verifyAndLoginOTP({ phone, status });
  //   return { resp };
  // }

  // @Throttle(3, 60)
  // @Get('/test')
  // async loginTrainee(@Query('id') id): Promise<any> {
  //   const resp = await this.dstService.checkUserInDb(id);
  //   return { resp };
  // }

  @Throttle(
    parseInt(process.env.DST_API_LIMIT),
    parseInt(process.env.DST_API_TTL),
  )
  @Get('/loginOrRegister')
  async loginOrRegister(
    @Query('phone') phone,
    @Query('otp') otp,
  ): Promise<any> {
    let resp: SignupResponse;
    if (phone == null || otp == null) {
      throw new HttpException(
        `Error loggin in: Param: ${
          phone == null ? (otp == null ? 'phone and otp' : 'phone') : ''
        } missing`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const otpStatus: SMSResponse = await this.otpService.verifyOTP({
        phone,
        otp,
      });
      const status = otpStatus.status;
      resp = await this.UCIService.verifyAndLoginOTP({ phone, status });
    }
    return { resp };
  }
}
