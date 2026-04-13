import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class News {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    author: string;

    @Field()
    createdAt: Date;
}