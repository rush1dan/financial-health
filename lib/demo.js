const { connectToMongoDB, disconnectFromMongoDB, addTransaction } = require("./mongodb");

const userId = '655b01682d033bc27160dd9e';

const transactionsToAdd = [
    {
        "date": "2023-01-05",
        "type": "Income",
        "amount": 123.45,
        "description": "Random Description 1"
    },
    {
        "date": "2023-01-14",
        "type": "Expense",
        "amount": 67.89,
        "description": "Random Description 2"
    },
    {
        "date": "2023-01-22",
        "type": "Asset",
        "amount": 321.23,
        "description": "Random Description 3"
    },
    {
        "date": "2023-01-28",
        "type": "Debt",
        "amount": 54.67,
        "description": "Random Description 4"
    },
    {
        "date": "2023-01-31",
        "type": "Income",
        "amount": 789.01,
        "description": "Random Description 5"
    },
    {
        "date": "2023-02-08",
        "type": "Expense",
        "amount": 123.45,
        "description": "Random Description 6"
    },
    {
        "date": "2023-02-16",
        "type": "Asset",
        "amount": 67.89,
        "description": "Random Description 7"
    },
    {
        "date": "2023-02-24",
        "type": "Debt",
        "amount": 321.23,
        "description": "Random Description 8"
    },
    {
        "date": "2023-02-28",
        "type": "Income",
        "amount": 54.67,
        "description": "Random Description 9"
    },
    {
        "date": "2023-03-04",
        "type": "Expense",
        "amount": 789.01,
        "description": "Random Description 10"
    },
    {
        "date": "2023-03-12",
        "type": "Asset",
        "amount": 123.45,
        "description": "Random Description 11"
    },
    {
        "date": "2023-03-20",
        "type": "Debt",
        "amount": 67.89,
        "description": "Random Description 12"
    },
    {
        "date": "2023-03-31",
        "type": "Income",
        "amount": 321.23,
        "description": "Random Description 13"
    },
    {
        "date": "2023-04-05",
        "type": "Expense",
        "amount": 54.67,
        "description": "Random Description 14"
    },
    {
        "date": "2023-04-13",
        "type": "Asset",
        "amount": 789.01,
        "description": "Random Description 15"
    },
    {
        "date": "2023-04-21",
        "type": "Debt",
        "amount": 123.45,
        "description": "Random Description 16"
    },
    {
        "date": "2023-04-29",
        "type": "Income",
        "amount": 67.89,
        "description": "Random Description 17"
    },
    {
        "date": "2023-05-03",
        "type": "Expense",
        "amount": 321.23,
        "description": "Random Description 18"
    },
    {
        "date": "2023-05-11",
        "type": "Asset",
        "amount": 54.67,
        "description": "Random Description 19"
    },
    {
        "date": "2023-05-19",
        "type": "Debt",
        "amount": 789.01,
        "description": "Random Description 20"
    },
    {
        "date": "2023-05-31",
        "type": "Income",
        "amount": 123.45,
        "description": "Random Description 21"
    },
    {
        "date": "2023-06-07",
        "type": "Expense",
        "amount": 67.89,
        "description": "Random Description 22"
    },
    {
        "date": "2023-06-15",
        "type": "Asset",
        "amount": 321.23,
        "description": "Random Description 23"
    },
    {
        "date": "2023-06-23",
        "type": "Debt",
        "amount": 54.67,
        "description": "Random Description 24"
    },
    {
        "date": "2023-06-30",
        "type": "Income",
        "amount": 789.01,
        "description": "Random Description 25"
    },
    {
        "date": "2023-07-06",
        "type": "Expense",
        "amount": 123.45,
        "description": "Random Description 26"
    },
    {
        "date": "2023-07-14",
        "type": "Asset",
        "amount": 67.89,
        "description": "Random Description 27"
    },
    {
        "date": "2023-07-22",
        "type": "Debt",
        "amount": 321.23,
        "description": "Random Description 28"
    },
    {
        "date": "2023-07-31",
        "type": "Income",
        "amount": 54.67,
        "description": "Random Description 29"
    },
    {
        "date": "2023-08-04",
        "type": "Expense",
        "amount": 789.01,
        "description": "Random Description 30"
    },
    {
        "date": "2023-08-12",
        "type": "Asset",
        "amount": 123.45,
        "description": "Random Description 31"
    },
    {
        "date": "2023-08-20",
        "type": "Debt",
        "amount": 67.89,
        "description": "Random Description 32"
    },
    {
        "date": "2023-08-31",
        "type": "Income",
        "amount": 321.23,
        "description": "Random Description 33"
    },
    {
        "date": "2023-09-05",
        "type": "Expense",
        "amount": 54.67,
        "description": "Random Description 34"
    },
    {
        "date": "2023-09-13",
        "type": "Asset",
        "amount": 789.01,
        "description": "Random Description 35"
    },
    {
        "date": "2023-09-21",
        "type": "Debt",
        "amount": 123.45,
        "description": "Random Description 36"
    },
    {
        "date": "2023-09-29",
        "type": "Income",
        "amount": 67.89,
        "description": "Random Description 37"
    },
    {
        "date": "2023-10-03",
        "type": "Expense",
        "amount": 321.23,
        "description": "Random Description 38"
    },
    {
        "date": "2023-10-11",
        "type": "Asset",
        "amount": 54.67,
        "description": "Random Description 39"
    },
    {
        "date": "2023-10-19",
        "type": "Debt",
        "amount": 789.01,
        "description": "Random Description 40"
    },
    {
        "date": "2023-10-31",
        "type": "Income",
        "amount": 123.45,
        "description": "Random Description 41"
    },
    {
        "date": "2023-11-06",
        "type": "Expense",
        "amount": 67.89,
        "description": "Random Description 42"
    },
    {
        "date": "2023-11-14",
        "type": "Asset",
        "amount": 321.23,
        "description": "Random Description 43"
    },
    {
        "date": "2023-11-22",
        "type": "Debt",
        "amount": 54.67,
        "description": "Random Description 44"
    },
    {
        "date": "2023-11-30",
        "type": "Income",
        "amount": 789.01,
        "description": "Random Description 45"
    },
    {
        "date": "2023-12-04",
        "type": "Expense",
        "amount": 123.45,
        "description": "Random Description 46"
    },
    {
        "date": "2023-12-12",
        "type": "Asset",
        "amount": 67.89,
        "description": "Random Description 47"
    },
    {
        "date": "2023-12-20",
        "type": "Debt",
        "amount": 321.23,
        "description": "Random Description 48"
    },
    {
        "date": "2023-12-28",
        "type": "Income",
        "amount": 54.67,
        "description": "Random Description 49"
    },
    {
        "date": "2023-12-31",
        "type": "Expense",
        "amount": 789.01,
        "description": "Random Description 50"
    },
    {
        "date": "2023-12-31",
        "type": "Asset",
        "amount": 123.45,
        "description": "Random Description 51"
    },
    {
        "date": "2023-12-31",
        "type": "Debt",
        "amount": 67.89,
        "description": "Random Description 52"
    },
    {
        "date": "2023-12-31",
        "type": "Income",
        "amount": 321.23,
        "description": "Random Description 53"
    },
    {
        "date": "2023-12-31",
        "type": "Expense",
        "amount": 54.67,
        "description": "Random Description 54"
    },
    {
        "date": "2023-12-31",
        "type": "Asset",
        "amount": 789.01,
        "description": "Random Description 55"
    },
    {
        "date": "2023-12-31",
        "type": "Debt",
        "amount": 123.45,
        "description": "Random Description 56"
    },
    {
        "date": "2023-12-31",
        "type": "Income",
        "amount": 67.89,
        "description": "Random Description 57"
    },
    {
        "date": "2023-12-31",
        "type": "Expense",
        "amount": 321.23,
        "description": "Random Description 58"
    }
];

export const addDemoData = async () => {
    try {
        await connectToMongoDB();
        
        console.log("adding");
        for (let index = 0; index < transactionsToAdd.length; index++) {
            const element = transactionsToAdd[index];
            await addTransaction(userId, element);
            if (index === transactionsToAdd.length - 1) {
                console.log("all added");
            }
        }
        
        await disconnectFromMongoDB();
    } catch (error) {
        console.log("Demo error: ", error.message);
    }
}