import { getTasks } from "@/api";
import AddTask from "./addTask";
import ToDoList from "./ToDoList";

export default async function Home() {
  const tasks = await getTasks();

  console.log(tasks);
  return (
    <main className="max-w-4xl  mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">To Do List</h1>
        <AddTask />
      </div>
      <ToDoList tasks={tasks} />
    </main>
  );
}
