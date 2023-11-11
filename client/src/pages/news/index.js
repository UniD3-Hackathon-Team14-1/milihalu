import { useState, useEffect } from 'react'
import axios from 'axios'

export default function News() {
  useEffect(() => {
    async function getData() {
      const data = await axios.get('/api/news', {
        params: {
            username: 'asdf'
        }
      });
    }
    getData();
  }, []);

  return(
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure><img src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
}