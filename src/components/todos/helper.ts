// Create a title for the modal dialog
export default function createTitle(type: string) {
  let title = "";
  switch (type) {
    case "REMOVE":
      title = "Remove Task";
      break;
    case "DONE":
      title = "Set Task as Done";
      break;
    case "INCOMPLETE":
      title = "Set Task as Open";
      break;
    case "NEW":
      title = "Create a new task";
      break;
  }
  return title;
}
