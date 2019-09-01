import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { collatedTaskExists } from "../helpers";
import moment from "moment";

export const useTask = selectedProject => {
  const [tasks, setTask] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "8a8sddfalskdjf");

    unsubscribe =
      selectedProject && !collatedTaskExists(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(tasks => ({
        id: tasks.id,
        ...tasks.data()
      }));
      setTask(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              tasks =>
                moment(tasks.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                tasks.archived !== true
            )
          : newTasks.filter(tasks => tasks.archived !== true)
      );
      setArchivedTasks(newTasks.filter(tasks => tasks.archived !== false));
    });
    return () => unsubscribe();
  }, [selectedProject]);
  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "8a8sddfalskdjf")
      .orderBy("projectId")
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
