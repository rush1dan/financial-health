const { connectToMongoDB, disconnectFromMongoDB, addTransaction } = require("./mongodb");

const userId = '655b01682d033bc27160dd9e';

const transactionsToAdd = [

]

await connectToMongoDB();

for (let index = 0; index < transactionsToAdd.length; index++) {
    const element = transactionsToAdd[index];
    await addTransaction(element);
}

await disconnectFromMongoDB();