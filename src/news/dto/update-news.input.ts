import { InputType, Field, ID, PartialType } from "@nestjs/graphql";
import { CreateNewsInput } from "./create-news.input";

@InputType()
export class UpdateNewsInput extends PartialType(CreateNewsInput) {
    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    status?: string;
}