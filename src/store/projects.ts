import { defineStore } from "pinia";
import _ from "lodash";

interface Project {
  screenshot: string;
}

interface ProjectsState {
  projects: Array<Project>;
  currentDesign: Project;
}

export const useProjectStore = defineStore("projects", {
  state: (): ProjectsState => ({
    projects: [],
    currentDesign: {
      screenshot: "",
    },
  }),
  actions: {
    setScreenshot(dataUrl: string): void {
      console.log(dataUrl);
      this.$patch({
        currentDesign: {
          screenshot: dataUrl,
        },
      });
    },
  },
});
