export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    category: string;
    rewardsEarned: number;
    merchant: string;
    merchantCity: string;
    merchantState: string;
}

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        amount: 150.75,
        date: new Date('2025-12-15'),
        category: 'Groceries',
        rewardsEarned: 15,
        merchant: 'HMart',
        merchantCity: 'Victoria',
        merchantState: 'BC',
    },
    {
        id: '2',
        amount: 89.50,
        date: new Date('2025-12-20'),
        category: 'Dining',
        rewardsEarned: 8,
        merchant: 'Pizza Place',
        merchantCity: 'Los Angeles',
        merchantState: 'CA',
    },
    {
        id: '3',
        amount: 45.00,
        date: new Date('2025-12-22'),
        category: 'Transportation',
        rewardsEarned: 4,
        merchant: 'Uber',
        merchantCity: 'New York',
        merchantState: 'NY',
    },
    {
        id: '4',
        amount: 200.00,
        date: new Date('2025-12-25'),
        category: 'Electronics',
        rewardsEarned: 20,
        merchant: 'Best Buy',
        merchantCity: 'Ottawa',
        merchantState: 'ON',
    },
];