"use client";
import {FormEventHandler, useEffect, useState} from "react";
import {GoPlus} from "react-icons/go";
import Modal from "./Modal";
import {useRouter} from "next/navigation";
import {createTaskForUser} from "@/api";

interface addTaskProps {
    refresh: () => void;
}

const AddTask = ({refresh}: addTaskProps) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [taskName, setTaskName] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem('userID');
        if (!userId) {
            // Redirect to the login page if userID is not present
            router.push('/login'); // Update with your login page route
        }
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userID');

        if (!userId) {
            // Redirect to login if user ID is not present
            router.push('/login'); // Update with your login page route
            return;
        }

        await createTaskForUser(userId!, taskName);
        setShowModal(false);
        setTaskName("");
        refresh();
    }
    return (<div>
        <button
            className="btn btn-primary w-full "
            onClick={() => setShowModal(true)}
        >
            Add Task <GoPlus/>
        </button>
        <Modal modalOpen={showModal} setModalOpen={setShowModal}>
            <form onSubmit={handleSubmit}>
                <h3 className="font-bold text-lg"> ADD TASK :))</h3>
                <div className="modal-action">
                    <input onChange={(e) => setTaskName(e.target.value)}
                           value={taskName}
                           type="text"
                           placeholder="Task Name"
                           className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-primary">submit</button>
                </div>
            </form>

        </Modal>
    </div>);
};

export default AddTask;
