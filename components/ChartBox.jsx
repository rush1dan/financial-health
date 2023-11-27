import React, { memo, useMemo } from 'react'
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

// const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//     },
//     scales: {
//         y: {
//             min: 0.00,
//             max: 100.00,
//         },
//         // x: {
//         //     title: {
//         //         display: true,
//         //         text: 'Day'
//         //     }
//         // }
//     }
// };

// const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30];

// const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: [
//                 { x: 1, y: 53.46 },
//                 { x: 7, y: 32.17 },
//                 { x: 23, y: 73.46 },
//             ],
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         // {
//         //     label: 'Dataset 2',
//         //     data: [10.00, 20.00, 30.00, 40.00, 50.00, 60.00, 70.00].reverse(),
//         //     borderColor: 'rgb(53, 162, 235)',
//         //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         // },
//     ],
// };

function prepareDataPoints(dataArray, xKey, yKey) {
    const output = [];
    for (let index = 0; index < dataArray.length; index++) {
        const element = dataArray[index];
        output.push({ 'x': element[xKey], 'y': element[yKey] });
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
                data: prepareDataPoints(graphData['Income'], dayOrMonth, 'amount'),
                borderColor: 'rgb(66, 245, 132)',
                backgroundColor: 'rgba(66, 245, 132, 0.5)',
            },
            {
                label: 'Debt',
                data: prepareDataPoints(graphData['Expense'], dayOrMonth, 'amount'),
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
    // if (!graphData) {
    //     return null;
    // }

    const { netIncomeData, netIncomeOptions, netAssetData, netAssetOptions } = useMemo(() => prepareData(graphData, year, month, isMonthly), [graphData]);

    return (
        <div className='w-full h-full p-4 border-2 border-gray-400 rounded-lg shadow-lg shadow-gray-600/20 flex flex-col items-center justify-center relative'>
            <div className='w-full h-full relative'>
                {
                    graphData ?
                        <Line options={netIncomeOptions} data={netIncomeData} />
                        :
                        <div className='w-full h-full flex flex-row items-center justify-center'>
                            <p>Nothing To Show</p>
                        </div>
                }
            </div>
        </div>
    )
});

export default ChartBox;