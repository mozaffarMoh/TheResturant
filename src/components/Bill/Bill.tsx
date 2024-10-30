'use client';
import './Bill.scss';
import { TiDocumentDelete } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import { FcPrint } from 'react-icons/fc';
import { Table } from 'antd';
import React from 'react';
import Cookies from 'js-cookie';

const Bill = () => {
  const [deleteHover, setDeleteHover] = React.useState(false);
  const [minusOneHover, setMinusOneHover] = React.useState(false);
  const [showRemoveCashConfirmation, setShowRemoveCashConfirmation] =
    React.useState(false);
  const [hoverIndex, setHoverIndex] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const totalCashCookies: any = Cookies.get('totalCash');
  const [totalCash, setTotalCash]: any = React.useState(totalCashCookies | 0);

  const columns: any = [
    {
      title: 'Num',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Unit price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: 'Total price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (unit: number, item: any) => <p>{unit * item?.num}</p>,
    },
    {
      title: 'Actions',
      render: (_: any, item: any, index: number) => {
        return (
          <div className="flexStart">
            <div
              className={`action-area flexCenter ${
                minusOneHover && index === hoverIndex && 'action-area-hover'
              }`}
            >
              <TiDocumentDelete
                className="minus-one"
                color="green"
                onMouseEnter={() => {
                  setMinusOneHover(true);
                  setHoverIndex(index);
                }}
                onMouseLeave={() => setMinusOneHover(false)}
              />
            </div>
            <div
              className={`action-area flexCenter ${
                deleteHover && index === hoverIndex && 'action-area-hover'
              }`}
            >
              <MdDelete
                className="remove-item"
                color="red"
                onMouseEnter={() => {
                  setDeleteHover(true);
                  setHoverIndex(index);
                }}
                onMouseLeave={() => setDeleteHover(false)}
              />
            </div>
          </div>
        );
      },
    },
  ];

  let ordersArray: any = [];
  /* Calculate Total Price */
  React.useEffect(() => {
    setTotalPrice(0);
    for (let i = 0; i < ordersArray.length; i++) {
      const itemTotal = ordersArray[i].unitPrice * ordersArray[i].num;
      setTotalPrice((prev) => prev + itemTotal);
    }
  }, [ordersArray]);

  /* Remove cash */
  const removeCash = () => {
    Cookies.remove('totalCash');
    setTotalCash(0);
    setShowRemoveCashConfirmation(false);
  };

  /* Add bill to cash and remove current array */
  const addToCash = () => {
    setTotalCash((prev: any) => prev + totalPrice);
  };

  /* Set cash in cookies */
  React.useEffect(() => {
    Cookies.set('totalCash', totalCash);
  }, [totalCash]);

  return (
    <div className="bill">
      <Table
        dataSource={ordersArray}
        columns={columns}
        key={'key'}
        footer={() => (
          <p>
            Total Price: &nbsp;{' '}
            <span className="total-price">{totalPrice}</span> SYP
          </p>
        )}
      />

      <div style={{ position: 'relative' }}>
        <button
          className="print-button flexCenterColumn"
          onClick={() => window.print()}
        >
          <p>Print</p>
          <FcPrint className="print-logo" />
        </button>
        <button
          className="add-to-cash"
          onClick={addToCash}
        >
          <p>Add to cash</p>
        </button>
        <button
          className="add-to-cash"
          onClick={() => setShowRemoveCashConfirmation(true)}
        >
          <p>Clear cash</p>
        </button>

        <div className="total-cash flexCenterColumn">
          <p>
            Total cash : {totalCashCookies ? totalCashCookies : totalCash} SYP
          </p>
        </div>

        {showRemoveCashConfirmation && (
          <div className="clear-confirmation flexCenterColumn">
            <p>Are you sure you want to clear all cash</p>
            <button onClick={removeCash}>Clear</button>
            <button onClick={() => setShowRemoveCashConfirmation(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bill;
