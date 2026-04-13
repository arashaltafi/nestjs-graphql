import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: "docs",
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: true,
      formatError: (error) => {
        return {
          message: error?.message,
          code: error?.extensions?.code
        };
      },
    }),
    UsersModule,
    NewsModule,
  ],
})

export class AppModule { }