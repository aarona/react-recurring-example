import { useState } from "react"
import { APIRequestResult } from "./components/APIRequestResult"
import RecurringSelect, { IceCubeHash } from "./components/RecurringSelect"

function App() {
  const [jsonData, setJsonData] = useState("")

  const handleSave = (hash: IceCubeHash) => {
    // console.log("Hash: ", hash)
    setJsonData(JSON.stringify(hash, null, 2))
  }
  
  return (
    <div className="App">
      <RecurringSelect onSave={handleSave}/>
      <APIRequestResult jsonData={jsonData} />
    </div>
  );
}

export default App;
