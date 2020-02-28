import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-core";
import { MyContext } from "../graphql-types/MyContext";
import { User } from "../entity/User";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new ApolloError("not authenticated");
  }

  const user = await User.findOne(context.req.session!.userId);

  if (!user?.isAdmin) {
    throw new ApolloError("not authorized");
  }

  return next();
};
