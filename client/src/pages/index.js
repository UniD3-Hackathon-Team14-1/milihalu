import { useState, useEffect } from 'react'
import axios from 'axios'

export default function abc() {
  const chick = "client/public/images/ch01_yellow.jpg";

  useEffect(() => {
    async function getData() {
      const data = await axios.get('/api/keyword');
      console.log(data.data);
    }
  }, []);

  return (
    <div className="App">
      <div className="top-box">
        <div className="text-box">
          <h1># 한파주의보</h1>
        </div>
      </div>
      <div className="centered-box">
        <div className="chick-img" />
      </div>
    </div>
  );
}
