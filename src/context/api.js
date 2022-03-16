import react, { createContext, useReducer } from 'react';
import IndexReducer from '../reducer';

const initialState = {
    tasks: [
        {
            id: Math.random().toFixed(4),
            title: "Note 1",
            todos: [
                {
                    id: Math.random().toFixed(4),
                    title: "Gym",
                    description: "Go to gym"
                },
                {
                    id: Math.random().toFixed(4),
                    title: "Dentist",
                    description: "Go to dentist"
                }
            ]
        },
        {
            id: Math.random().toFixed(4),
            title: "Note 2",
            todos: []
        }
    ]
}

export const AppContext = createContext(initialState)

export const AppProvider = (props) => {
    const[state, dispatch] = useReducer(IndexReducer, initialState)

    const deleteTask = (id) => {
        dispatch({
            type: 'delete_task',
            payload: id
        })
    }

    const addTask = (task) => {
        dispatch({
            type: 'add_task',
            payload: task
        })
    }

    const addSubTask = (currentCard) => {
        dispatch({
            type: "add_sub_task",
            payload: currentCard
        })
    }

    const editTitle = (task) => {
        dispatch({
            type: 'edit_title',
            payload: task
        })
    }
    return(
        <AppContext.Provider value={{tasks: state.tasks, deleteTask, addTask, addSubTask, editTitle}}>
            {props.children}
        </AppContext.Provider>
    )
}
