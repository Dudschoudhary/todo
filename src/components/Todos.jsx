import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, copyTodo, editTodo } from '../features/todo/todoSlice';

function Todos() {
  const todos = useSelector(state => state.todos); // Corrected selector to access todos
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditClick = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editId) {
      dispatch(editTodo({ id: editId, text: editText }));
      setEditId(null);  
      setEditText(' ');
    }
  };

  return (
    <>
      <div className='text-yellow-800 my-4 text-xl'>Todos</div>

      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="text-white bg-zinc-700 border rounded p-2"
                />
                <button
                  onClick={handleSaveEdit}
                  className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md">
                  Save
                </button>
              </>
            ) : (
              <>
                <div className='text-white'>{todo.text}</div>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  Remove
                </button>
                <button
                  onClick={() => dispatch(copyTodo(todo.id))}
                  className='text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md'>Copy
                </button>
                <button
                  onClick={() => handleEditClick(todo)}
                  className='text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded text-md'>Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
