
import { useState } from"react";
export default function NewTask({onAdd})
{
  const [enteredTask, setEnteredTask] = useState('');

  function handleChange(event)
  {
    setEnteredTask(event.target.value);
  }

  function handleClick(){
    if(enteredTask.trim() == ''){
        return;
    }
    onAdd(enteredTask);
    setEnteredTask('');
  }
    return (
    <div className="flex items-center gap-4">
        <input type="text" className="w-64
        px-2 px-1 rounded-sm bg-stone-200 py-4"
          onChange={handleChange}
          value={enteredTask} />
        <button onClick={handleClick}>Add Task</button>
    </div>
    );
}