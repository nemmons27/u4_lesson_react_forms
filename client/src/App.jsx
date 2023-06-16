import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [issues, setIssues] = useState([])

  const getIssues = async () => {
    try {
      let res = await axios.get('http://localhost:3001/issues')
      setIssues(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getIssues()
  }, [])

  return (
    <div>
      <h1>Issues:</h1>
      {issues.map((issue) => (
        <div key={issue._id}>
          <h3>Type: {issue.issueType}</h3>
          <p>Subject: {issue.subject}</p>
          <p>Message: {issue.message}</p>
        </div>
      ))}
    </div>
  )
}

export default App
