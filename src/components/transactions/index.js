import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.scss';

const calculateSubsidy = (price, subsidy) => (price / 100) * subsidy;

function getSubsidy(price = 0, pricing = {
  subsidy: 7, discount_subsidy: 4, discount_cutoff: 750
}) {
  if (price < pricing.discount_cutoff) {
    return calculateSubsidy(price, pricing.subsidy);
  }

  return calculateSubsidy(price, pricing.discount_subsidy);
}

function Transactions({ merchant = '' }) {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    if (merchant) {
      axios
        .get(`http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants/${merchant}.json`)
        .then(response => setTransactions(response.data));
    }
  }, [merchant]);

  let total = 0;
  let totalSubsidy = 0;

  if (transactions) {
    total = transactions.transactions.reduce((total, transaction) => total + transaction.price, 0);
    totalSubsidy = transactions.transactions.reduce((total, transaction) =>
      total + getSubsidy(transaction.price, transactions.pricing),
      0
    );
  }

  return (
    <div className="Transactions">
      {transactions && (
        <>
          <div className="headerWrapper">
            <div className="meta">
              <div className="header">Transactions</div>
              <div className="merchantName">{transactions.name}</div>
              <div className="pricing">
                <div className="item">
                  <div className="title">Count</div>
                  <div className="value">
                    {transactions.transactions.length}
                  </div>
                </div>
                <div className="item">
                  <div className="title">Total</div>
                  <div className="value">
                    £{total.toFixed(2)}
                  </div>
                </div>
                <div className="item">
                  <div className="title">Subsidy</div>
                  <div className="value">
                    £{totalSubsidy.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <svg viewBox="0 0 20 20" className="pie">
              <circle r="10" cx="10" cy="10" className="base" />
              <circle
                r="5"
                cx="10"
                cy="10"
                strokeWidth="10"
                strokeDasharray={`calc(${(totalSubsidy / total) * 360} * 31.4 / 100) 31.4`}
                transform="rotate(-90) translate(-20)"
                className="slice"
              />
            </svg>
          </div>
          <div className="listing">
            <div className="row header">
              <div className="column description">Description</div>
              <div className="column date">Date</div>
              <div className="column price">Price</div>
              <div className="column subsidy">Subsidy</div>
            </div>
            {transactions.transactions.map((transaction, index) => (
              <div className="row transaction" key={`transaction-${index}`}>
                <div className="column description">{transaction.description}</div>
                <div className="column date">
                  {moment(transaction.date).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                <div className="column price">
                  £{transaction.price.toFixed(2)}
                </div>
                <div className="column subsidy">
                  £{getSubsidy(transaction.price, transactions.pricing).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Transactions;
