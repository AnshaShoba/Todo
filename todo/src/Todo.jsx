import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function Todo() {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState('');
    const [updatedValue, setUpdatedValue] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/get");
            setTasks(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addTask = async () => {
        try {
            const newTask = {
                idno: Math.round(Math.random() * 10000),
                Task: inputValue
            };
            const res = await axios.post("http://localhost:5000/post", newTask);
            console.log(res);

            setTasks(prevTasks => [...prevTasks, newTask]);

            setInputValue('');
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (idno) => {
        try {
            await axios.post(`http://localhost:5000/delete/${idno}`);
            getData();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const editTask = (task) => {
        setCurrentTask(task);
        setUpdatedValue(task.Task);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`http://localhost:5000/update/${currentTask.idno}`, { Task: updatedValue });
            getData();
            setShowModal(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className='img'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mt-4"><i>Todo list</i></h2>
                        <div className="input-group mb-5">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your Task" 
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <div>
                                <Button className='m-2' variant="primary text-light" onClick={addTask}>Add Task</Button>
                            </div>
                        </div>
                        <center>
                            <ul className="list-group mt-5">
                                {tasks.map((task, i) => (
                                    <li 
                                        key={i} 
                                        className="list-group-item d-flex justify-content-between align-items-center "
                                    >
                                        <span 
                                            className="task-text" 
                                            onClick={(e) => e.target.style.textDecoration = e.target.style.textDecoration === 'line-through' ? 'none' : 'line-through'}
                                        >
                                            {task.Task}
                                        </span>
                                        <div>
                                            <Button className='m-2' variant="success" onClick={() => editTask(task)}>Edit</Button>
                                            <Button className='m-2' variant="danger" onClick={() => deleteTask(task.idno)}>Delete</Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </center>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Updated Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail bg-secondary">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter new task" 
                                value={updatedValue} 
                                onChange={(e) => setUpdatedValue(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Todo;
