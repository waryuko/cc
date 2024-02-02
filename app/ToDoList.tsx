import React from "react";
import {Task} from "../api";
import TaskCard from "./task";

interface Props {
    tasks: Task[];
}


const ToDoList: React.FC<Props> = ({tasks}) => {
    return (<div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th className="text-3xl">TASKS</th>
            </tr>
            {tasks.map((task) => (<TaskCard key={task.id} task={task}/>))}
            </thead>
            <tbody></tbody>
        </table>
    </div>);
};

export default ToDoList;
