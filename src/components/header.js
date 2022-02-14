import React, {useState, useContext} from 'react'
import '../App.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { AppContext } from '../context/api';

const Header = () => {
    const {addTask} = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === "") {
          alert("Please give a column name")
        }
        else{
          const newTask = {
            id: Math.random().toFixed(4),
            title: input,
            todos: []
          }
          addTask(newTask);
          setShow(false);
          setInput("");
        }
    }
  return (
    <div className='header'>
        <h2>Task-Notes</h2>
        <button onClick={() => setShow(true)}>&#x271A; Add New Column</button>

        {/* Add column modal */}
        {show && <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Add New Column</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Column Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Column Name..." 
                        value={input}
                        onChange={e => setInput(e.target.value)} 
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
        </Modal>}
    </div>
  )
}

export default Header
