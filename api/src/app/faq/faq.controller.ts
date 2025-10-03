import { Body, Controller, Get, Post } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqClient } from './faq.interface';
import { BasicResponse } from '../../interface/http';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  async getAllFaq() {
    const data = await this.faqService.getAllFaq();

    return data;
  }

  @Post()
  async createNewPresale(@Body() data: FaqClient): Promise<BasicResponse> {
    try {
      await this.faqService.createNewFaq(data);
      return { message: 'Add FAQ data success!', ok: true };
    } catch (error) {
      console.error(error);
      return { message: error.message, ok: false };
    }
  }
}
