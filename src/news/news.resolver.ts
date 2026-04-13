import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { NewsService } from "./news.service";
import { News } from "./entities/news.entity";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";

@Resolver(() => News)
export class NewsResolver {
    constructor(private readonly service: NewsService) { }

    // 📄 list
    @Query(() => [News])
    newsList() {
        return this.service.findAll();
    }

    // 🔎 single + view counter
    @Query(() => News)
    news(@Args("id") id: string) {
        return this.service.findOne(id);
    }

    // 🔍 search
    @Query(() => [News])
    searchNews(@Args("query") query: string) {
        return this.service.search(query);
    }

    // ➕ create
    @Mutation(() => News)
    createNews(@Args("input") input: CreateNewsInput) {
        return this.service.create(input);
    }

    // ✏️ update
    @Mutation(() => News)
    updateNews(@Args("input") input: UpdateNewsInput) {
        return this.service.update(input);
    }

    // ❌ delete
    @Mutation(() => Boolean)
    removeNews(@Args("id") id: string) {
        return this.service.remove(id);
    }

    // ❤️ like system
    @Mutation(() => News)
    likeNews(@Args("id") id: string) {
        return this.service.like(id);
    }

    // 🚀 publish
    @Mutation(() => News)
    publishNews(@Args("id") id: string) {
        return this.service.publish(id);
    }
}