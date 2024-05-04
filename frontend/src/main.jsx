import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Filter from './components/Filter.jsx'
import JobList from './components/JobList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Filter />
    <JobList />
  </React.StrictMode>,
)
