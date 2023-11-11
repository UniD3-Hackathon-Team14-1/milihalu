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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"/></svg>
        <span className="btm-nav-label">Calendar</span>
      </button>
      <button className={path === '/diary' ? 'active' : ''} onClick={() => {window.location.href = '/diary'}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M17 2H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h1v1a1 1 0 0 0 1 1a1 1 0 0 0 1-1v-1h9a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm-3 16H6V4h8Zm4-1a1 1 0 0 1-1 1h-1V4h1a1 1 0 0 1 1 1Z"/></svg>
        <span className="btm-nav-label">Diary</span>
      </button>
      <button className={path === '/news' ? 'active' : ''} onClick={() => {window.location.href = '/news'}}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016c-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z"/><path fill="currentColor" d="M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z"/></svg>
        <span className="btm-nav-label">News</span>
      </button>
    </div>
  )
}
