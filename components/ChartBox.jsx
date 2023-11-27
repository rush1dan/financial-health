import React from 'react'
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        y: {
            min: 0.00,
            max: 100.00,
        },
        // x: {
        //     title: {
        //         display: true,
        //         text: 'Day'
        //     }
        // }
    }
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [
                { x: 1, y: 53.46 },
                { x: 7, y: 32.17 },
                { x: 23, y: 73.46 },
            ],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        // {
        //     label: 'Dataset 2',
        //     data: [10.00, 20.00, 30.00, 40.00, 50.00, 60.00, 70.00].reverse(),
        //     borderColor: 'rgb(53, 162, 235)',
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // },
    ],
};

const ChartBox = ({ graphData }) => {

    return (
        <div className='w-full h-full p-4 border-2 border-gray-400 rounded-lg shadow-lg shadow-gray-600/20 flex flex-col items-center justify-center relative'>
            <div className='w-full h-full relative'>
                <Line options={options} data={data} />
            </div>
        </div>
    )
}

export default ChartBox