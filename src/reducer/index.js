export default (state, action) => {
    switch(action.type){
        case 'delete_task':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case 'add_task':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                
            }
        case 'add_sub_task':
            return {
                tasks: action.payload
            }
        case 'edit_title':
            const updatedTask = action.payload;
            const updatedTasks = state.tasks.map((task) => {
                if (task.id === updatedTask.id) {
                    task.title = updatedTask.title
                }
                return task;
            });
            return {
                ...state,
                tasks: updatedTasks
            };
        default:
            return state;
    }
}