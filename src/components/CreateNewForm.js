import Axios from "axios"
import React, { useState} from "react"
import Alert from 'react-bootstrap/Alert';

function CreateNewForm(props) {
  const [name, setName] = useState("")
  const [requirements, setRequirements] = useState("")
  const [customerType, setCustomerType] = useState("")
  const [prospects, setProspects] = useState("")

  const[show,setShow] =useState(false)

  async function submitHandler(e) {
    e.preventDefault()
    const data = new FormData()
    if(name !== "" && name.trim() !=="" && 
      requirements !== "" && requirements.trim() &&
      customerType !== "" && customerType.trim() &&
      prospects !=="" && prospects.trim()
      ){
      data.append("name", name)
      data.append("requirements", requirements)
      data.append("customerType", customerType)
      data.append("prospects", prospects)
      setName("")
      setRequirements("")
      setCustomerType("")
      setProspects("")
      const newData = await Axios.post("/create-audience", data, { headers: { "Content-Type": "multipart/form-data" } })
      props.setAudience(prev => prev.concat([newData.data]))
      setShow(false)
    }else{
      setShow(true)
    }
  }

  return (
    <>
    <div className="form-audience">
      <h3 className="form-audience--title">What is Your Audience?</h3>
    <form className="p-3 bg-opacity-25 mb-3" onSubmit={submitHandler}>
      <div className="form-audience--item">
       <label for="basic-url" class="form-label">Who are your customers?</label>
        <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="" />
      </div>
      <div className="form-audience--item">
        <label for="basic-url" class="form-label">Are There any special requirements like tecnology, location etc.?</label>
        <input onChange={e => setRequirements(e.target.value)} value={requirements} type="text" className="form-control" placeholder="" />
      </div>
      <div className="form-audience--item">
         <label for="basic-url" class="form-label">What types of customers should be excluded?</label>
        <input onChange={e => setCustomerType(e.target.value)} value={customerType} type="text" className="form-control" placeholder="" />
      </div>
      <div className="form-audience--item">
         <label for="basic-url" class="form-label">What are the positions of your prospects?</label>
        <input onChange={e => setProspects(e.target.value)} value={prospects} type="text" className="form-control" placeholder="" />
      </div>
      <button className="btn btn-danger">Submit!</button>
    </form>
   
    </div>
    {
      show ? <Alert variant="danger" className="danger-alert" >
      <Alert.Heading>Please fill all input!</Alert.Heading>
    </Alert> :""
    }
    </>
  )
}

export default CreateNewForm