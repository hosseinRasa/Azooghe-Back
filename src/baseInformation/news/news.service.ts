import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';

import { News, NewsDocument } from './schemas/news.schema';
import { NewsCreateDto } from './dto/news-create.dto';
import { UpdateNewsDto } from './dto/news-update.dto';
@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}
  async findAll(description?: string) {
    if (description) {
      const news = await this.newsModel.findOne({
        description: description?.toLowerCase(),
      });

      if (news) {
        return news;
      } else return null;
    }
    return await this.newsModel.find();
  }

  async findById(id: string) {
    return await this.newsModel.findById(id);
  }

  async create(newsCreateDto: NewsCreateDto) {
    return await new this.newsModel(newsCreateDto).save();
  }
  async update(id: string, updatedNews: UpdateNewsDto) {
    return await this.newsModel.updateOne(
      { _id: Object(id) }, // filter
      { $set: { ...updatedNews } },
    ); // fields to update
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.newsModel.deleteOne({ _id: Object(id) }, {});
  }
}
