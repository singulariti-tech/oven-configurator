import { ViteSetupModule } from "@/types/ViteSetupModule";
import { defaults } from "mande";

// https://posva.net/mande/
export const install: ViteSetupModule = ({ isClient, initialState, app }) => {
  defaults.headers.Authorization = "";
};
