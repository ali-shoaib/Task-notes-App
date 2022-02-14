import React, { useState, useContext } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { AppContext } from '../context/api';
import CardComp from './cardComp';

const DisplayCards = () => {
  const {tasks, deleteTask, addSubTask, editTitle} = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({ title:'', description:'' });
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState('')
  const [currentTodo, setCurrentTodo] = useState({})
  const [todoId, setTodoId] = useState(0);

  const handleChange = (e) => {
    const v = e.target.value;
      setInputs({
      ...inputs,
      [e.target.name]: v
    });
  }

  const enableAddSubTask = (id) => {
    tasks.find(task => {
      if(task.id === id){
        console.log(task)
        setShow(true);
        setTodoId(id)
      }
    })
  }

  const HandleAddSubTask = () => {
    if (inputs.title !== "" && inputs.description !== "") {
      const newTodo = {
        id: Math.random().toFixed(4),
        title: inputs.title,
        description: inputs.description
      }
      const currentCard = tasks.map(task => {
        if(task.id === todoId) {
          task.todos = [...task.todos, newTodo]
        }
        return task
      })
      addSubTask(currentCard);
      setInputs({ title:'', description:'' });
    }
    else{
      alert('Title and description must be filled')
    }
  }

  const enableEditing = (task) => {
    try{
      tasks.find(t => {
        if(t.id === task.id){
          setEditInput(t.title)
          setIsEditing(true);
        }
      })
      let ct = tasks.find(t => t.id === task.id)
      setCurrentTodo(ct);
      
    }
    catch(err){
      console.log(err);
    }
  }

  const handleEditSubmit = () => {
    if(editInput === ""){
      alert("Title can't be blanked");
    }
    else{
      currentTodo.title = editInput
      editTitle(currentTodo);
      setIsEditing(false);
    }
  }

  return (
    <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:"wrap", background:"#dbdbdb"}}>

      {/* Edit title modal */}
      {isEditing && <Modal show={isEditing} onHide={() => setIsEditing(false)}>
        <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Edit Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={editInput}
                        onChange={e => setEditInput(e.target.value)} 
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleEditSubmit}>
            Save
          </Button>
        </Modal.Footer>
        </Modal>}

      {/* Add todo Modal */}
      {show && <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Add New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={HandleAddSubTask}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tilte</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Tilte..." 
                        value={inputs.title}
                        onChange={handleChange}
                        name="title" 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Description..." 
                        value={inputs.description}
                        onChange={handleChange}
                        name="description" 
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={HandleAddSubTask}>
            Add
          </Button>
        </Modal.Footer>
        </Modal>}

      {/* Tasks list */}
        {tasks.length !== 0 ? tasks.map((task) => (
        <CardComp 
          task={task} 
          enableAddSubTask={enableAddSubTask} 
          enableEditing={enableEditing} 
          deleteTask={deleteTask}
          key={task.id}
        />
        )) 
      : <h3 style={{margin: '30px 0 0 0', color: 'steelblue',}}>No tasks here.</h3>}
    </div>
  )
}

export default DisplayCards
