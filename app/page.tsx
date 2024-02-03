'use client'
import React, { useEffect, useState } from 'react';
import AddTask from "./addTask";
import ToDoList from "./ToDoList";
import { getTaksByUserId, Task } from "@/api";

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            if (userId) {
                const tasksData = await getTaksByUserId(userId);
                setTasks(tasksData);
            }
        } catch (error) {
            console.error(`Error fetching tasks for user ${userId}:`, error);
        }
    };

    useEffect(() => {
        // Load user id from local storage or wherever you get it
        const getUserId = localStorage.getItem('userID');
        setUserId(getUserId);
    }, []);

    useEffect(() => {
        // Call fetchTasks only if userId is available
        if (userId) {
            fetchTasks();
        }
    }, [userId]); // This ensures that fetchTasks is called whenever userId changes

    return (
        <main className="max-w-4xl mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">To Do List</h1>
                <AddTask refresh={fetchTasks} />
            </div>
            <ToDoList tasks={tasks} refresh={fetchTasks} />
        </main>
    );
}
