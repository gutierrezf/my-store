import { Resolver, Query, UseMiddleware, Mutation, Arg } from "type-graphql";
import { User } from "../entity/User";
import { isAdmin } from "../middleware/isAdmin";
import { UserResponse } from "../graphql-types/UserResponse";
import { UserRoleInput } from "../graphql-types/UserRoleInput";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  @UseMiddleware(isAdmin)
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAdmin)
  async updateUserRole(
    @Arg("input")
    { email, isAdmin }: UserRoleInput
  ): Promise<UserResponse> {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        errors: [
          {
            path: "email",
            message: "does not exist"
          }
        ]
      };
    }

    await User.update({ email }, { isAdmin });

    const newUser = await User.findOne({ email });

    return { user: newUser };
  }
}
