import { mande } from "mande";
import { globalOptions } from "../live/settings";
import { User } from "@/types/site/user";

const ENDPOINT_USERS = "/api/users";

const API = mande(ENDPOINT_USERS, globalOptions);

function listUsers(): Promise<Array<User>> {
  return API.get("");
}

function createUser(user: User) {
  return API.post(user);
}

function updateUser(user: User) {
  return API.put(user);
}

const UserAPI = {
  listUsers,
  createUser,
  updateUser,
};

export default UserAPI;
