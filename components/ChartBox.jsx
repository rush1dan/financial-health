import React, { memo, useMemo, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { months } from '@/lib/utils';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function prepareDataPoints(dataArray, xKey, yKey) {
    const output = [];
    if (dataArray) {
        for (let index = 0; index < dataArray.length; index++) {
            const element = dataArray[index];
            output.push({ 'x': element[xKey], 'y': element[yKey] });
        }
    }
    return output;
}

function getScale(array) {
    let min = Infinity, max = -Infinity;
    for (let index = 0; index < array.length; index++) {
        const element = array[index].y;
        if (element < min) {
            min = element;
        }
        if (element > max) {
            max = element;
        }
    }
    const range = max - min;
    const halfRange = range / 2;
    min -= halfRange;
    if (min < 0) { min = 0; }
    max += halfRange;
    return { 'suggestedMin': Math.floor(min), 'suggestedMax': Math.round(max) };
}

function prepareData(graphData, year, month, isMonthly) {
    if (!graphData) {
        return { netIncomeData: null, netIncomeOptions: null, netAssetData: null, netAssetOptions: null }
    }

    let labels = [];
    let dayOrMonth = '';
    if (isMonthly) {
        const lastDay = new Date(year, month, 0).getDate();
        for (let index = 1; index <= lastDay; index++) {
            labels.push(index);
        }
        dayOrMonth = 'day';
    } else {
        labels = months;
        dayOrMonth = 'month';
    }

    const commonOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    }

    const netIncomeData = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: prepareDataPoints(graphData['Income'], dayOrMonth, 'amount'),
                borderColor: 'rgb(66, 245, 132)',
                backgroundColor: 'rgba(66, 245, 132, 0.5)',
            },
            {
                label: 'Expense',
                data: prepareDataPoints(graphData['Expense'], dayOrMonth, 'amount'),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };

    const netIncomeOptions = {
        ...commonOptions,
        scales: {
            // x: {
            //     type: 'linear', // Assuming your x-axis is numerical
            //     position: 'bottom',
            //     suggestedMin: 0,
            //     suggestedMax: 30,
            //     ticks: {
            //         stepSize: 1, // Set your desired step size here
            //     }
            // },
            y: getScale(netIncomeData.datasets[0].data.concat(netIncomeData.datasets[1].data)),
        }
    }

    const netAssetData = {
        labels,
        datasets: [
            {
                label: 'Asset',
                data: prepareDataPoints(graphData['Asset'], dayOrMonth, 'amount'),
                borderColor: 'rgb(66, 245, 132)',
                backgroundColor: 'rgba(66, 245, 132, 0.5)',
            },
            {
                label: 'Debt',
                data: prepareDataPoints(graphData['Debt'], dayOrMonth, 'amount'),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };

    const netAssetOptions = {
        ...commonOptions,
        scales: {
            y: getScale(netAssetData.datasets[0].data.concat(netAssetData.datasets[1].data))
        }
    }

    return { netIncomeData, netIncomeOptions, netAssetData, netAssetOptions }
}

const ChartBox = memo(({ graphData, year, month, isMonthly }) => {
    const { netIncomeData, netIncomeOptions, netAssetData, netAssetOptions } = useMemo(() => prepareData(graphData, year, month, isMonthly), [graphData]);
    const [showIncomeGraph, setShowIncomeGraph] = useState(true);
    return (
        <div className='w-full h-full p-4 border-2 border-gray-400 rounded-lg shadow-lg shadow-gray-600/20 flex flex-col items-center justify-center relative'>
            <div className='w-full h-full'>
                {
                    graphData ?
                        <Line options={showIncomeGraph ? netIncomeOptions : netAssetOptions} data={showIncomeGraph ? netIncomeData : netAssetData} />
                        :
                        <div className='w-full h-full flex flex-row items-center justify-center'>
                            <p>Nothing To Show</p>
                        </div>
                }
            </div>

            {/* Tabs */}
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex flex-row items-end justify-center'>
                <button className={`w-24 h-8 text-sm border-b-0 border-2 font-medium rounded-tl-md
                    ${showIncomeGraph ? 'text-gray-800 bg-slate-100 border-r-2 border-gray-400 shadow-inner shadow-gray-700/20 pointer-events-none' :
                        'text-gray-700 border-r-0 border-gray-200 bg-white hover:bg-slate-50'}`}
                    onClick={(e) => setShowIncomeGraph(true)}>
                    Net Income
                </button>
                <button className={`w-24 h-8 text-sm border-b-0 border-2 font-medium rounded-tr-md
                    ${!showIncomeGraph ? 'text-gray-800 bg-slate-100 border-l-2 border-gray-400 shadow-inner shadow-gray-700/20 pointer-events-none' :
                        'text-gray-700 border-l-0 border-gray-200 bg-white hover:bg-slate-50'}`}
                    onClick={(e) => setShowIncomeGraph(false)}>
                    Net Asset
                </button>
            </div>
        </div>
    )
});

ChartBox.displayName = 'ChartBox';
export default ChartBox;