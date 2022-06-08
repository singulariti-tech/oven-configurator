import { defineStore } from "pinia";
import { Role, User } from "@/types/site/user";
import { Session } from "@/types/site/session";

export const useApplicationStore = defineStore("application", {
  state: () => ({
    session: {
      user: null,
      token: "",
      authenticated: false,
    },
  }),
});
