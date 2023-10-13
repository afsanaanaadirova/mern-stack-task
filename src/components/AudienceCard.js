import React from "react"

function AudienceCard(props) {
  return (
    <div className="card">
      <div className="card-body">
          <>
            <p className="text-muted small">Who are your customers?<span>{props.name}</span></p>
            <p className="text-muted small">Are There any special requirements like tecnology, location etc.?<span>{props.requirements}</span></p>
            <p className="text-muted small">What types of customers should be excluded?<span>{props.customerType}</span></p>
            <p className="text-muted small">What are the positions of your prospects?<span>{props.prospects}</span></p>
          </>
      </div>
    </div>
  )
}

export default AudienceCard