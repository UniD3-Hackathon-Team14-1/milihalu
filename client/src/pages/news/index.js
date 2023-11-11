import { useState, useEffect } from 'react'
import axios from 'axios'

export default function News() {
  const [dataList, setDataList] = useState(undefined);
  useEffect(() => {
    async function getData() {
      const data = await axios.get('/api/news', {
        params: {
            username: 'asdf'
        }
      });
      console.log(data.data);
      setDataList(data.data);
    }
    getData();
  }, []);

  return(
    <div>
      {dataList && <h1 className="text-2xl ml-4">#{dataList.keyword1.category}</h1>}
      {
        dataList
        &&
        dataList.keyword1.items.map(
          (x) =>
          <div className="card card-side bg-base-100 border my-4">
            <div className="card-body">
            <a className="card-title link" href={x.originallink}>{x.title}</a>
            <p>{x.description}</p>
          </div>
        </div>
        )
      }
      {dataList && <h1 className="text-2xl ml-4">#{dataList.keyword2.category}</h1>}
      {
        dataList
        &&
        dataList.keyword2.items.map(
          (x) =>
          <div className="card card-side bg-base-100 border my-4">
            <div className="card-body">
            <a className="card-title link" href={x.originallink}>{x.title}</a>
            <p>{x.description}</p>
          </div>
        </div>
        )
      }
    </div>
  );
}