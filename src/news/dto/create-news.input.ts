import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateNewsInput {
    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    author: string;
}