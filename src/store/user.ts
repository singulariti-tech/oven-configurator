import { defineStore } from "pinia";
import { Role, User } from "@/types/site/user";
import _ from "lodash";
import UserAPI from "@/api/mock/users";

interface UsersState {
  users: Array<User>;
}

export const useUserStore = defineStore("users", {
  state: (): UsersState => ({
    users: [],
  }),
  actions: {
    async createUser(user: User) {
      await UserAPI.createUser(user);
    },
    async updateUser(user: User) {
      await UserAPI.updateUser(user);

      // blank out the password
      user.password = "";
      const index = _.findIndex(this.users, { id: user.id });
      if (index) {
        this.users[index] = user;
      }
    },
    async disableUser(user: User) {
      user.enabled = false;
      await this.updateUser(user);
    },
    async resetPassword(user: User) {
      user.password = "taikisha";
      user.enabled = true;
      await this.updateUser(user);
    },
    async retrieveUsers() {
      const users: Array<User> = await UserAPI.listUsers();
      this.users = users;
    },
  },
});
