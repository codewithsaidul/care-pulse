import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {



  try {

    const newUser = await users.create(
      ID.unique(),
      user?.email,
      user?.phone,
      user?.name
    );

 

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents?.users[0];
    }
  }
};


// Get the user

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    console.log(user);

    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }
}
