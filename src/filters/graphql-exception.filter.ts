import { Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const status = exception.getStatus();

        return {
            message: exception.message,
            statusCode: status,
            timestamp: new Date().toISOString(),
        };
    }
}