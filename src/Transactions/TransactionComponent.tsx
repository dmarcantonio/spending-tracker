import * as React from 'react';
import { Transaction } from './Transaction';

const TransactionComponent = ({ transaction }: { transaction: Transaction }) => {
    const [open, setOpen] = React.useState(false);

    // Format date: weekday, day numeric
    const formattedDate = transaction.date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }); 
    const amountStr = `$${transaction.amount.toFixed(2)}`;

    return (
        <div className="border rounded-md p-3 bg-white shadow-sm">
            <div
                onClick={() => setOpen(o => !o)}
                role="button"
                aria-pressed={open}
                aria-expanded={open}
                className="flex justify-between items-center cursor-pointer"
            >
                <div className="flex gap-4 items-center">
                    <span className="text-sm text-gray-600">{formattedDate}</span>
                    <span className="font-medium">{transaction.merchant}</span>
                </div>
                <div className="text-sm font-semibold">{amountStr}</div>
            </div>

            {open && (
                <div className="mt-3 text-sm text-gray-700">
                    <h3 className="text-sm text-gray-900">Transaction ID: {transaction.id}</h3>
                    <p>Amount: ${transaction.amount.toFixed(2)}</p>
                    <p>Date: {transaction.date.toDateString()}</p>
                    <p>Category: {transaction.category}</p>
                    <p>Rewards Earned: {transaction.rewardsEarned}</p>
                    <p>Merchant: {transaction.merchant}</p>
                    <p>Location: {transaction.merchantCity}, {transaction.merchantState}</p>
                </div>
            )}
        </div>
    );
}

export { TransactionComponent };