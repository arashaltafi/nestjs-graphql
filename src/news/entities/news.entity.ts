import { ObjectType, Field, ID, Int } from "@nestjs/graphql";

export enum NewsCategory {
    TECH = "TECH",
    SPORTS = "SPORTS",
    POLITICS = "POLITICS",
    OTHER = "OTHER",
}

export enum NewsStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
}

@ObjectType()
export class News {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    author: string;

    @Field(() => String)
    category: NewsCategory;

    @Field(() => String)
    status: NewsStatus;

    @Field(() => Int)
    likes: number;

    @Field(() => Int)
    views: number;

    @Field()
    createdAt: Date;
}