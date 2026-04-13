import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { NewsService } from "./news.service";
import { News } from "./entities/news.entity";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";
import { InternalServerErrorException } from "@nestjs/common";

@Resolver(() => News)
export class NewsResolver {
    constructor(private readonly newsService: NewsService) { }

    @Query(() => [News])
    newsList() {
        return this.newsService.findAll();
    }

    @Query(() => News)
    news(@Args("id", { type: () => Int }) id: number) {
        return this.newsService.findOne(id);
    }

    @Mutation(() => News)
    createNews(@Args("input") input: CreateNewsInput) {
        return this.newsService.create(input);
    }

    @Mutation(() => News)
    updateNews(@Args("input") input: UpdateNewsInput) {
        return this.newsService.update(input);
    }

    @Mutation(() => Boolean)
    removeNews(@Args("id", { type: () => Int }) id: number) {
        return this.newsService.remove(id);
    }
}