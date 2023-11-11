import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Calendar() {
  const korDay = ['월', '화', '수', '목', '금', '토', '일'];
  const [selectedDay, setSelectedDay] = useState('');
  const [task, setTask] = useState(['task 1', 'task 2', 'task 3']);

  useEffect(() => {
    async function getData() {
      const data = await axios.get('/api/weekly', {
        params: {
          week: '2023-11-6',
          username: 'asdf'
        }
      });
      console.log(data);
    }
    getData();
  }, [])



  return (
    <div className="">
      <div className="carousel w-full flex justify-between p-2 my-10">
        {
          korDay.map((x, i) => 
            <div
              className="carousel-item px-3 py-2 border rounded-box" key={i}
              onClick={() => setSelectedDay(x)}
            >{x}</div>
          )
        }
      </div>
      
      <h1 className="text-2xl mb-6">Today's Task</h1>
      <div className="rounded-box border p-4">
        <h2 className="ml-4 mb-4 text-xl">{task.length} tasks</h2>
        {
          task.map((x, i) => 
            <div className="flex items-center p-2" key={i}>
              <input type="checkbox" className="checkbox mr-4" />
              <input type="text" value={x} onChange={(y) => {
                let _task = [...task];
                _task[i] = y.target.value;
                setTask(_task);
              }} placeholder="Type here" className="input input-ghost input-sm w-full mr-4" />
              <svg
                onClick={() => {
                  let _task = [];
                  for(let j = 0; j < task.length; j++){
                    if(j == i) continue;
                    _task.push(task[j]);
                  }
                  setTask(_task);
                }}
               xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><g fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></g></svg>
            </div>
          )
        }
        <span className="text-2xl w-full flex justify-center"
          onClick={() => {
            let _task = [...task];
            _task.push('');
            return setTask(_task);
          }}
        >+</span>
        
      </div>

    </div>
  )
}
