const TodoCard = ({task,completed})=>{
    return(
        <div className="flex items-center justify-between p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <span className={`text-lg ${completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
        {task}
      </span>
      <div className="flex gap-2">
        <button className="text-sm px-3 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50">Done</button>
        <button className="text-sm px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50">Delete</button>
      </div>
    </div>
    );
};