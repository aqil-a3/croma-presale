import { Body, Controller, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { PresaleService } from './presale.service';
import { PresaleClient } from './presale.interface';
import { BasicResponse, ResponseWithData } from '../../interface/http';
import { SharedSecretGuard } from 'src/guards/shared-secret.guard';

@Controller('presale')
export class PresaleController {
  constructor(private readonly presaleService: PresaleService) {}
  @UseGuards(SharedSecretGuard)
  @Get()
  async getAllPresale() {
    const data = await this.presaleService.getAllPresale();

    return data;
  }

  @UseGuards(SharedSecretGuard)
  @Get('/active')
  async getActivePresale(): Promise<ResponseWithData<PresaleService | null>> {
    const data = await this.presaleService.getActivePresale();

    if (!data)
      return {
        data,
        message: 'Data not found',
        ok: false,
      };

    return {
      data,
      message: 'Retreive success',
      ok: true,
    };
  }

  @UseGuards(SharedSecretGuard)
  @Patch('/is_active')
  async patchStatusPresale(@Body() data: { presaleId: number }) {
    return await this.presaleService.patchStatusPresale(data.presaleId);
  }

  @UseGuards(SharedSecretGuard)
  @Put()
  async editPresale(
    @Body() body: { data: PresaleClient; presaleId: number },
  ): Promise<BasicResponse> {
    try {
      await this.presaleService.editPresale(body.data, body.presaleId);
      return { message: 'Edit presale data success!', ok: true };
    } catch (error) {
      console.error(error);
      return { message: error.message, ok: false };
    }
  }

  @UseGuards(SharedSecretGuard)
  @Post()
  async createNewPresale(@Body() data: PresaleClient): Promise<BasicResponse> {
    try {
      await this.presaleService.createNewPresale(data);
      return { message: 'Add presale data success!', ok: true };
    } catch (error) {
      console.error(error);
      return { message: error.message, ok: false };
    }
  }
}
