import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(() => [User])
    users() {
        return this.usersService.findAll();
    }

    @Query(() => User)
    user(@Args("id", { type: () => Int }) id: number) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => User)
    createUser(@Args("input") input: CreateUserInput) {
        return this.usersService.create(input);
    }

    @Mutation(() => User)
    updateUser(@Args("input") input: UpdateUserInput) {
        return this.usersService.update(input);
    }

    @Mutation(() => Boolean)
    removeUser(@Args("id", { type: () => Int }) id: number) {
        return this.usersService.remove(id);
    }
}