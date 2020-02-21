import React, { useState } from 'react';
import './index.scss';
import Merchants from "../merchants";
import Transactions from "../transactions";

function App() {
  const [selectedMerchant, setSelectedMerchant] = useState('');

  return (
    <div className="App">
      <Merchants
        selected={selectedMerchant}
        setSelected={setSelectedMerchant}
      />
      <Transactions merchant={selectedMerchant}/>
    </div>
  );
}

export default App;
