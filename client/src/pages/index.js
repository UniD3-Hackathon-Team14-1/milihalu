import { useState, useEffect } from 'react'
import axios from 'axios'

export default function abc() {
  const [key, setKey] = useState(undefined);
  const chick = "client/public/images/ch01_yellow.jpg";

  useEffect(() => {
    async function getData() {
      const data = await axios.get('/api/keyword');
      setKey(data.data);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <div className="top-box">
        <div className="text-box">
          {
            key && <h1>{key.keyword}</h1>
          }
        </div>
      </div>
      <div className="centered-box">
        <div className="chick-img" />
      </div>
      {
        key && <pre className="w-full whitespace-pre-line">{key.script}</pre>
      }
    </div>
  );
}
