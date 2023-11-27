import { getFinancialScore, getTotalAmounts } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

function getColorRGB(value) {
    // Ensure the input value is within the valid range (0 to 100)
    value = Math.max(0, Math.min(100, value));

    // Calculate the red, green, and blue components based on the input value
    var red = 255 - Math.round((value * 255) / 100);
    var green = Math.round((value * 255) / 100);
    var blue = 0;

    // Return the RGB value as a string
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function netIncome(income, expense) {
    return (Number(income) - Number(expense)).toFixed(2);
}

function netAsset(asset, debt) {
    return (Number(asset) - Number(debt)).toFixed(2);
}

const ScoreCard = ({ transactions }) => {
    const [score, setScore] = useState(-1);
    const [accountData, setAccountData] = useState({ income: 0, expense: 0, asset: 0, debt: 0 });
    useEffect(() => {
        const account = getTotalAmounts(transactions);
        setAccountData(account);
        setScore(getFinancialScore(account.income, account.expense, account.asset, account.debt));
    }, [transactions]);
    return (
        <div className='w-full h-full border-2 border-gray-400 rounded-lg shadow-lg shadow-gray-600/20 flex flex-col items-center justify-center relative p-4'>
            <div className='absolute w-full text-center top-8 font-semibold'>
                Score:
            </div>
            <div>
                {
                    transactions.length > 0 ?
                        <div className={`text-5xl font-bold`} style={{color: getColorRGB(score)}}>
                            {
                                score >= 0 &&
                                score
                            }
                        </div> :
                        <div>
                            Nothing to show
                        </div>
                }
            </div>
            <div className='absolute w-full flex flex-row items-center justify-center gap-x-12 bottom-8'>
                <div className='flex flex-row gap-x-2'>
                    <p className='text-gray-500 font-medium'>Net Income: </p>
                    <p className={`font-bold ${netIncome(accountData.income, accountData.expense) > 0 ? 'text-green-500' : 'text-red-500'}`}>{netIncome(accountData.income, accountData.expense)}</p>
                </div>
                <div className='flex flex-row gap-x-2'>
                    <p className='text-gray-500 font-medium'>Net Asset: </p>
                    <p className={`font-bold ${netAsset(accountData.asset, accountData.debt) > 0 ? 'text-green-500' : 'text-red-500'}`}>{netAsset(accountData.asset, accountData.debt)}</p>
                </div>
            </div>
        </div>
    )
}

export default ScoreCard