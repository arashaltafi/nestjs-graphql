import { Injectable, NotFoundException } from "@nestjs/common";
import { News } from "./entities/news.entity";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";

@Injectable()
export class NewsService {
    private news: News[] = [
        {
            id: 1,
            title: "NestJS Released",
            description: "New version of NestJS released",
            author: "Arash",
            createdAt: new Date(),
        },
        {
            id: 2,
            title: "GraphQL Popular",
            description: "GraphQL adoption increases",
            author: "Admin",
            createdAt: new Date(),
        },
    ];

    findAll(): News[] {
        return this.news;
    }

    findOne(id: number): News {
        const item = this.news.find((n) => n.id === id);

        if (!item) {
            throw new NotFoundException("News not found");
        }

        return item;
    }

    create(input: CreateNewsInput): News {
        const news: News = {
            id: Date.now(),
            createdAt: new Date(),
            ...input,
        };

        this.news.push(news);

        return news;
    }

    update(input: UpdateNewsInput): News {
        const news = this.findOne(input.id);

        Object.assign(news, input);

        return news;
    }

    remove(id: number): boolean {
        const index = this.news.findIndex((n) => n.id === id);

        if (index === -1) {
            throw new NotFoundException("News not found");
        }

        this.news.splice(index, 1);

        return true;
    }
}