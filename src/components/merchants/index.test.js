import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import Merchants from './index';
import { act } from "@testing-library/react";

const mockMerchants = [
  {
    "merchant_id": "A1201",
    "name": "Rohan LLC Shoes",
    "_links": {
      "self": {
        "href": "/merchants/A1201.json"
      }
    }
  },
  {
    "merchant_id": "A1202",
    "name": "Carroll - Lang Grocery",
    "_links": {
      "self": {
        "href": "/merchants/A1202.json"
      }
    }
  }
];

jest.mock('axios');
axios.get.mockImplementation(() => Promise.resolve({ data: mockMerchants }));

describe('The Merchants component', () => {
  it('renders', () => {
    const result = shallow(<Merchants />);
    expect(result).toMatchSnapshot();
  });

  it('mounts', async () => {
    const setSelected = jest.fn();
    let result;
    await act(async () => {
      result = mount(<Merchants selected="A1201" setSelected={setSelected} />);
    });
    result.update();

    expect(axios.get).toHaveBeenCalledWith('http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants.json');
    expect(setSelected).toHaveBeenCalledWith('A1201');
    expect(result).toMatchSnapshot();
  });
});
