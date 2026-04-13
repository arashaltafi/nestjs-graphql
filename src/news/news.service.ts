import { Injectable, NotFoundException } from "@nestjs/common";
import { News, NewsCategory, NewsStatus } from "./entities/news.entity";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";
import { v4 as uuid } from "uuid";

@Injectable()
export class NewsService {
    private news: News[] = [
        {
            id: "1",
            title: "title 1",
            description: "description 1",
            author: "arash",
            category: NewsCategory.TECH,
            status: NewsStatus.PUBLISHED,
            likes: 1000,
            views: 8465,
            createdAt: new Date()
        }
    ];

    findAll(): News[] {
        return this.news;
    }

    findOne(id: string): News {
        const item = this.news.find((n) => n.id === id);

        if (!item) throw new NotFoundException("News not found");

        // 📊 auto increase views
        item.views++;

        return item;
    }

    search(query: string): News[] {
        return this.news.filter((n) =>
            n.title.toLowerCase().includes(query.toLowerCase()),
        );
    }

    create(input: CreateNewsInput): News {
        const news: News = {
            id: uuid(),
            title: input.title,
            description: input.description,
            author: input.author,
            category: input.category as any,
            status: NewsStatus.DRAFT,
            likes: 0,
            views: 0,
            createdAt: new Date(),
        };

        this.news.push(news);
        return news;
    }

    update(input: UpdateNewsInput): News {
        const news = this.findOne(input.id);

        Object.assign(news, input);

        return news;
    }

    remove(id: string): boolean {
        const index = this.news.findIndex((n) => n.id === id);

        if (index === -1) throw new NotFoundException("News not found");

        this.news.splice(index, 1);
        return true;
    }

    like(id: string): News {
        const news = this.findOne(id);
        news.likes++;
        return news;
    }

    publish(id: string): News {
        const news = this.findOne(id);
        news.status = NewsStatus.PUBLISHED;
        return news;
    }
}