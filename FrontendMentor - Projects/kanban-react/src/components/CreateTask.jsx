import React, { useState } from 'react'; 

export default function CreateTask(props){
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleCreateTask = (e)=>{
    e.preventDefault();
    if (props.currentBoard) {
      const newTask = createTask()
      updateCurrentBoard(newTask)
      props.boardListUpdateForNewTasks(newTask)
    }
    handleCloseForm();
  }

  const createTask = ()=>{
    console.log('Título:', title);
    console.log('Descrição:', description);
    console.log('Categoria:', category);
    setId(prev => prev+1);
    const newTask = {
      id: id,
      title: title,
      description: description,
      category: category,
    };
    return newTask
  }

  const updateCurrentBoard = (newTask)=>{
    props.setCurrentBoard((prev)=> {return {
        ...prev,
        taskList: [...prev.taskList, newTask],
    }})
  }

  const handleCloseForm = ()=>{
    setTitle("");
    setDescription("");
    setCategory("");
    props.setDisplayForm({display: "none"})
}

  return (
    <div style={props.displayForm}>
      <h2>New Task</h2>
      <button onClick={handleCloseForm} >X</button>
      <form onSubmit={handleCreateTask}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Status:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            <option value="TODO">Todo</option>
            <option value="DOING">Doing</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}