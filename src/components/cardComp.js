import React from 'react'
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Card, Button } from 'react-bootstrap';

const CardComp = ({enableEditing, deleteTask, enableAddSubTask, task}) => {
  return (
    <>
      <Card key={task.id} border="info" style={{ position:"relative", height: '400px', width: '400px', maxWidth:"98%", margin: '10px 0 10px 0' }}>
          <Card.Header style={{display:'flex', justifyContent:'space-between'}}>
          <Card.Title>
            <button style={{background:'transparent', border:'none', color:"steelblue", margin:'0 5px 0 0'}}><BsThreeDotsVertical /></button>
            {task.title}
          </Card.Title>
          <div>
            <button onClick={() =>  enableEditing(task)} style={{background:'transparent', border:'none'}}>
              <FiEdit />
            </button>
            <button onClick={() => deleteTask(task.id)} style={{background:'transparent', border:'none', color:"red", margin:'0 0 0 5px'}}>
              <RiDeleteBin2Fill />
            </button>
          </div>
        </Card.Header>
        <Card.Body style={{overflowY:'auto'}}>
          {task.todos.map(todo => (
            <div key={todo.id} style={{display:'flex', margin:'0 0 15px 0'}}>
              <button style={{background:'transparent', border:'none', color:"steelblue", margin:'0 5px 0 0'}}>
                <BsThreeDotsVertical />
              </button>
              <div>
                <Card.Title>
                  {todo.title}
                </Card.Title>
                <Card.Text>
                  {todo.description}
                </Card.Text>
              </div>
            </div>            
          ))}
        </Card.Body>
        <Button onClick={() => enableAddSubTask(task.id)} style={{width:"70px", fontSize: '11px', position: 'absolute', bottom: '5px', right: '5px'}} variant="primary">Add Task</Button>
      </Card>
    </>
  )
}

export default CardComp;
