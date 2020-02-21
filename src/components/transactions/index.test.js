import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import Transactions from './index';
import { act } from "@testing-library/react";

const mockTransactions = {
  "name": "Rohan LLC Shoes",
  "merchant_id": "A1201",
  "pricing": {
    "subsidy": 9,
    "discount_subsidy": 6,
    "discount_cutoff": 600
  },
  "transactions": [
    {
      "description": "Granite Keyboard",
      "date": "2019-02-20T15:06:32.153Z",
      "price": 1675
    },
    {
      "description": "Generic Wooden Bacon",
      "date": "2019-03-08T17:58:17.636Z",
      "price": 2540
    },
    {
      "description": "Pants",
      "date": "2019-03-11T11:48:04.699Z",
      "price": 1558
    }
  ]
};

jest.mock('axios');
axios.get.mockImplementation(() => Promise.resolve({ data: mockTransactions }));

describe('The Transactions component', () => {
  it('renders', () => {
    const result = shallow(<Transactions />);
    expect(result).toMatchSnapshot();
  });



  it('mounts', async () => {
    const merchant = 'A1201';
    let result;
    await act(async () => {
      result = mount(<Transactions merchant={merchant} />);
    });
    result.update();

    expect(axios.get).toHaveBeenCalledWith(`http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants/${merchant}.json`);
    expect(result).toMatchSnapshot();
  });
});
