// Create User
interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    tasks: string[];
}

export interface Task {
    id?: string;
    title: string;
    userId: string;
}
const url = 'https://todolist-api-bl9z.onrender.com';
const login = async (email: string, password: string): Promise<boolean> => {
    let isLogged = false;
    try {
        const response = await fetch(`${url}/users`);
        const data = await response.json();

        data.map((user: User) => {
            if (user.email === email && user.password === password) {
                console.log("User is logged in");
                isLogged = true;
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
    }
    return isLogged;
}
const createUser = async (email: string, username: string, password: string): Promise<string> => {
    try {
        const response = await fetch(`${url}/users`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                email, username, password, tasks: [],
            }),
        });

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('Error creating user:', error);
    }
    return "";
};

// Read Users
const getAllUsers = async (): Promise<void> => {
    try {
        const response = await fetch(`${url}/users`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const getUserById = async (userId: string): Promise<User> => {
    try {
        const response = await fetch(`${url}/users/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
    }
    return {username: "", email: "", password: "", tasks: []};
};
 const getUserIdByEmail = async (email: string): Promise<string> => {
    let userId = "";
    try {
        const response = await fetch(`${url}/users` , {cache : "no-cache"});
        const data = await response.json();

        data.map((user: User) => {
            if (user.email === email) {
                userId = user.id || "";
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    return userId;
}
const getTaksByUserId = async (userId: string): Promise<Task[]> => {
    const tasks: Task[] = [];
    try {
        const response = await fetch(`${url}/tasks ` , {cache : "no-cache"});
        const data = await response.json();
        data.map((task: Task) => {
            if (task.userId === userId) {
                tasks.push(task);
            }
        });
    } catch (error) {
        console.error(`Error fetching tasks for user ${userId}:`, error);
    }

    return tasks;
}
// Update User
const updateUser = async (userId: string, email: string, username: string, password: string): Promise<void> => {
    try {
        // Fetch user data (assuming getUserById returns a Promise)
        const user = await getUserById(userId);

        // Update user data
        const response = await fetch(`${url}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
                username,
                email,
                password,
                tasks: user.tasks, // Assuming tasks is directly available in the user object
            }),
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
    }
};


// Delete User
const deleteUser = async (userId: string): Promise<void> => {
    try {
        const response = await fetch(`${url}/users/${userId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(`Error deleting user ${userId}:`, error);
    }
};

// Create Task for User
const createTaskForUser = async (userId: string, title: string): Promise<void> => {
    try {
        const response = await fetch(`${url}/tasks`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                title, userId,
            }),
        });

        const data = await response.json();
        await addTaskToUser(userId, data.id);
        console.log(data);
    } catch (error) {
        console.error('Error creating task:', error);
    }
};

const addTaskToUser = async (userId: string, taskId: string): Promise<void> => {
    try {
        const user = await getUserById(userId);
        const response = await fetch(`${url}/users/${userId}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                id :userId ,
                username: user.username,
                email: user.email,
                password: user.password,
                tasks: [...user.tasks, taskId],
            }),
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(`Error adding task ${taskId} to user ${userId}:`, error);
    }
}

// Read Tasks for User


// Update Task for User
const updateTaskForUser = async (userId: string, taskId: string, title: string): Promise<void> => {
    try {
        const response = await fetch(`${url}/tasks/${taskId}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
               id: taskId ,  title,  userId,
            }),
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(`Error updating task ${taskId} for user ${userId}:`, error);
    }
};

// Delete Task for User
const deleteTaskForUser = async (userId: string, taskId: string): Promise<void> => {
    try {
        const response = await fetch(`${url}/tasks/${taskId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(`Error deleting task ${taskId} for user ${userId}:`, error);
    }
};
const isEmailExist = async (email: string): Promise<boolean> => {
    let isExist = false;
    try {
        const response = await fetch(`${url}/users`);
        const data = await response.json();

        data.map((user: User) => {
            if (user.email === email) {
                isExist = true;
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    return isExist;
}
const  main = async () : Promise<void> =>{
    const tasks = getTaksByUserId("642b");
    tasks.then((data) => {
        console.log(data);
    }
    )
}
export {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    createTaskForUser,
    getUserIdByEmail,
    updateTaskForUser,
    deleteTaskForUser,
    getTaksByUserId ,
    login ,
    main,
    isEmailExist
};






