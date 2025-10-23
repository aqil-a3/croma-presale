import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqClient, FaqDb } from './faq.interface';
import { BasicResponse } from '../../interface/http';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @UseGuards(SharedSecretGuard)
  @Get()
  async getAllFaq() {
    const data = await this.faqService.getAllFaq();

    return data;
  }

  @UseGuards(SharedSecretGuard)
  @Post()
  async createNewFaq(@Body() data: FaqClient): Promise<BasicResponse> {
    try {
      await this.faqService.createNewFaq(data);
      return { message: 'Add FAQ data success!', ok: true };
    } catch (error) {
      console.error(error);
      return { message: error.message, ok: false };
    }
  }

  @UseGuards(SharedSecretGuard)
  @Put()
  async editFaq(@Body() data: FaqDb) {
    return await this.faqService.editFaq(data);
  }
}
