import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Pin } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pin/:id')
  async getPinById(@Param('id') id: string): Promise<Pin> {
    return this.appService.pin({ id: Number(id) });
  }

  @Get('pins')
  async getPins(): Promise<Pin[]> {
    return this.appService.pins({});
  }

  @Post('pin')
  async postPin(
    @Body()
    pinData: {
      name: string;
      latitude: number;
      longitude: number;
    },
  ): Promise<Pin> {
    const pin = await this.appService.createPin({
      name: pinData.name,
      latitude: pinData.latitude,
      longitude: pinData.longitude,
    });
    return pin;
  }

  @Put('pin')
  async updatePin(
    @Body()
    pinData: {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
    },
  ): Promise<Pin> {
    return this.appService.updatePin({
      where: { id: pinData.id },
      data: {
        name: pinData.name,
        latitude: pinData.latitude,
        longitude: pinData.longitude,
      },
    });
  }

  @Delete('pin/:id')
  async deletePin(@Param('id') id: string): Promise<Pin> {
    return this.appService.deletePin({ id: Number(id) });
  }
}
