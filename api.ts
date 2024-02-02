const baseUrl = "https://todolist-api-bl9z.onrender.com/tasks";

export interface Task {
    id: string;
    title: string;
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(baseUrl, {cache: "no-cache"});
    return await response.json();
};

export const createTask = async (task: Task): Promise<Task> => {
    const response = await fetch(baseUrl, {
        method: "POST", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(task),
    });
    return await response.json();
}

export const editTodo = async (todo: Task): Promise<Task> => {
    const res = await fetch(`${baseUrl}/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return await res.json();
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    })
}