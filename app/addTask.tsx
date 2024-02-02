"use client";
import {FormEventHandler, useState} from "react";
import {GoPlus} from "react-icons/go";
import Modal from "./Modal";
import {createTask} from "@/api";
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "next/navigation";
const AddTask = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [taskName, setTaskName] = useState("");
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await createTask({
            id: uuidv4(),
            title: taskName,

        });
        setShowModal(false);
        setTaskName("");
        router.refresh();

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
