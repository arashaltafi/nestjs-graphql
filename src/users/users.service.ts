import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
    private users: User[] = [
        { id: 1, name: "Arash", email: "arash@test.com" },
        { id: 2, name: "John", email: "john@test.com" },
    ];

    findAll(): User[] {
        return this.users;
    }

    findOne(id: number): User {
        const user = this.users.find((u) => u.id === id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    create(input: CreateUserInput): User {
        const user: User = {
            id: Date.now(),
            ...input,
        };

        this.users.push(user);
        return user;
    }

    update(input: UpdateUserInput): User {
        const user = this.users.find((u) => u.id === input.id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        Object.assign(user, input);

        return user;
    }

    remove(id: number): boolean {
        const index = this.users.findIndex((u) => u.id === id);

        if (index === -1) return false;

        this.users.splice(index, 1);
        return true;
    }
}