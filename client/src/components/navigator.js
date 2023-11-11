import { useState, useEffect } from 'react'

export default function Navigator() {
  const [path, setPath] = useState('/');
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <div className="btm-nav">
      <button className={path === '/' ? 'active' : ''} onClick={() => {window.location.href = '/'}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span className="btm-nav-label">Home</span>
      </button>
      <button className={path === '/calendar' ? 'active' : ''} onClick={() => {window.location.href = '/calendar'}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"/></svg>
        <span className="btm-nav-label">Calendar</span>
      </button>
      <button className={path === '/diary' ? 'active' : ''} onClick={() => {window.location.href = '/diary'}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        <span className="btm-nav-label">Diary</span>
      </button>
    </div>
  )
}
