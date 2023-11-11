import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Calendar() {
  const korDay = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedDay, setSelectedDay] = useState(-1);
  const [task, setTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await axios.get('/api/weekly', {
        params: {
          date: '2023-11-6',
          username: 'asdf'
        }
      });
      console.log(data.data)
      setTask(data.data);
    }
    getData();
  }, []);

  useEffect(() => {
    if(task.length === 0) return;
    setSelectedTask(task[selectedDay].data);
  }, [selectedDay]);

  useEffect(() => {
    if(task.length === 0) return;
    let _task = [...task];
    _task[selectedDay].data = selectedTask;
    setTask(_task);
  }, [selectedTask]);

  function updateScheduleHandler(body) {
    async function updateData() {
      const response = await axios.put('/api/updateSchedule', body);
    }
    updateData();
  }

  return (
    <div className="mb-20">
      <div className="carousel w-full flex justify-between p-2 py-4 my-6">
        {
          korDay.map((x, i) => 
            <div className="indicator">
              {
                task.length > 0 &&
                task[i].data.length > 0 &&
                <span className="indicator-item badge badge-secondary"></span>
              }
              <div
                className="carousel-item px-3 py-2 border rounded-box" key={i}
                onClick={() => setSelectedDay(i)}
              >{x}</div>
            </div>
          )
        }
      </div>
      
      <h1 className="text-2xl mb-6">{task[selectedDay] && task[selectedDay].day} Task</h1>
      <div className="rounded-box border p-4">
        <h2 className="ml-4 mb-4 text-xl">{selectedTask.length} tasks</h2>
        {
          selectedTask.map((x, i) => 
            <div className="flex items-center p-2" key={i}>
              <input type="checkbox" checked={x.checked ? 'checked' : ''} className="checkbox mr-4"
                onChange={() => {
                  let _task = [...selectedTask];
                  _task[i].checked = !_task[i].checked;
                  updateScheduleHandler({
                    "username": "asdf",
                    "day": task[selectedDay].day,
                    "data": _task
                  });
                  setSelectedTask(_task);
                }}
              />
              <input type="text" value={x.task} onChange={(y) => {
                let _task = [...selectedTask];
                _task[i].task = y.target.value;
                updateScheduleHandler({
                  "username": "asdf",
                  "day": task[selectedDay].day,
                  "data": _task
                });
                console.log(_task)
                setSelectedTask(_task);
              }} placeholder="Type here" className="input input-ghost input-sm w-full mr-4" />
              <svg
                onClick={() => {
                  let _task = [];
                  for(let j = 0; j < selectedTask.length; j++){
                    if(j == i) continue;
                    _task.push(selectedTask[j]);
                  }
                  updateScheduleHandler({
                    "username": "asdf",
                    "day": task[selectedDay].day,
                    "data": _task
                  });
                  setSelectedTask(_task);
                }}
               xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><g fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></g></svg>
            </div>
          )
        }
        <span className="text-2xl w-full flex justify-center"
          onClick={() => {
            let _task = [...selectedTask];
            _task.push({checked: false, task: ''});
            updateScheduleHandler({
              "username": "asdf",
              "day": task[selectedDay].day,
              "data": _task
            });
            return setSelectedTask(_task);
          }}
        >+</span>
        
      </div>

    </div>
  )
}
