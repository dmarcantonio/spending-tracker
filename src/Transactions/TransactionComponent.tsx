import * as React from 'react';
import { Transaction } from  './Transaction';

const TransactionComponent = ({ transaction }: { transaction: Transaction }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p>Transaction ID: {transaction.id}</p>
            <p>Amount: ${transaction.amount.toFixed(2)}</p>
            <p>Date: {transaction.date.toDateString()}</p>
            <p>Category: {transaction.category}</p>
            <p>Rewards Earned: {transaction.rewardsEarned}</p>
            <p>Merchant: {transaction.merchant}</p>
            <p>Location: {transaction.merchantCity}, {transaction.merchantState}</p>
        </div>
    );
}

export { TransactionComponent };