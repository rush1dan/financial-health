import { getFinancialScore, getTotalAmounts } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

const ScoreCard = ({ transactions }) => {
    const [score, setScore] = useState(-1);
    useEffect(() => { 
        const { income, expense, asset, debt } = getTotalAmounts(transactions);
        setScore(getFinancialScore(income, expense, asset, debt));
    }, [transactions]);
    return (
        <div className='w-full h-full shadow-lg shadow-gray-600/20 flex flex-col items-center justify-center'>
            {
                transactions.length > 0 ? 
                    (

                        score >= 0 &&
                        score
                    ) :
                    (
                        'Nothing to show'
                    )
            }
        </div>
    )
}

export default ScoreCard