import React from 'react'

interface APIRequestResultProps {
  jsonData: string
}

export const APIRequestResult: React.FC<APIRequestResultProps> = ({ jsonData }) => {
  if(jsonData) {
    return <div className="recurring-select">
      <div className="code-heading">API Request Result:</div>
      <pre className="code">{jsonData}</pre>
    </div>
  } else {
    return <></>
  }
}