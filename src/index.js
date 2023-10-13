import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import Axios from "axios"
import CreateNewForm from "./components/CreateNewForm"
import AnimalCard from "./components/AudienceCard"

function App() {
  const [audience, setAudience] = useState([])

  useEffect(() => {
    async function go() {
      const response = await Axios.get("/api/audience")
      setAudience(response.data)
      console.log(response)
    }
    go()
  }, [])
  return (
    <div className="container">
      <CreateNewForm comp={<CreateNewForm/>} setAudience={setAudience} />
      <div className="audience-grid">
        {audience.map(function (audience) {
          return <AnimalCard key={audience._id} name={audience.name} 
          requirements={audience.requirements} 
          customerType={audience.customerType}
          prospects={audience.prospects}
          id={audience._id} setAudience={setAudience} />
        })}
      </div>
    </div>
  )
}

const root = createRoot(document.querySelector("#app"))
root.render(<App />)