const TodoCard = ({ task, completed, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all">
      <span 
        onClick={onToggle}
        className={`text-lg cursor-pointer ${completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}
      >
        {task}
      </span>
      <div className="flex gap-2">
        <button 
          onClick={onToggle}
          className="text-sm px-3 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50 transition"
        >
          {completed ? 'Undo' : 'Done'}
        </button>
        <button 
          onClick={onDelete}
          className="text-sm px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;