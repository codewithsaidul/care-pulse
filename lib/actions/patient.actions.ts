import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {



  try {


    console.log({
      email: user?.email,
      phone: user?.phone,
      name: user?.name,
    });


    const newUser = await users.create(
      ID.unique(),
      user?.email,
      user?.phone,
      user?.name
    );

 

    return parseStringify(newUser);
  } catch (error: any) {
    // if (error && error?.code === 409) {
    //   const documents = await users.list([Query.equal("email", [user.email])]);

    //   return documents?.users[0];
    // }
    console.log(error);
  }
};
