import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.scss';

function Merchants({ selected = '', setSelected = () => {} }) {
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {
      axios
        .get('http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants.json')
        .then(({ data }) => {
          setMerchants(data);
          if (data.length > 0) setSelected(data[0].merchant_id);
        });
    }, [setSelected]);

    return (
      <div className="Merchants">
        <div className="header">Merchants</div>
        {merchants.map(merchant => (
          <div
            className={`merchant ${merchant.merchant_id === selected ? 'selected' : ''}`}
            key={`merchant-${merchant.merchant_id}`}
            onClick={() => setSelected(merchant.merchant_id)}
          >
            <div className="name">{merchant.name}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="arrow"
            >
              <path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z" />
            </svg>
          </div>
        ))}
      </div>
    );
}

export default Merchants;
