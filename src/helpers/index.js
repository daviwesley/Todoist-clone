import { collatedTask } from "../constants";

export const collatedTaskExists = selectedProject => {
  collatedTask.find(task => task.key === selectedProject);
};
