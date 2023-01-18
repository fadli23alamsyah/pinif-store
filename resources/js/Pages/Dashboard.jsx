import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Chart } from 'chart.js/auto';
import { useEffect, useState } from 'react';

export default function Dashboard(props) {
    const labels = ["Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"]

    useEffect(()=>{
        createChart();
    }, [])

    const createChart = ()=>{
        new Chart(document.getElementById("chart-cost"),{
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Penjualan',
                        data: props.data.totalSale,
                        fill: false,
                        borderColor: 'rgb(0, 213, 0)',
                        tension: 0.1
                    },
                    {
                        label: 'Pembelian',
                        data: props.data.totalPurchase,
                        fill: false,
                        borderColor: 'rgb(213, 0, 0)',
                        tension: 0.1
                    },
                ]
            }
        })


        new Chart(document.getElementById("chart-unit"),{
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Penjualan',
                        data: props.data.unitsSale,
                        fill: false,
                        borderColor: 'rgb(0, 213, 0)',
                        tension: 0.1
                    },
                    {
                        label: 'Pembelian',
                        data: props.data.unitsPurchase,
                        fill: false,
                        borderColor: 'rgb(213, 0, 0)',
                        tension: 0.1
                    },
                ]
            }
        })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Dashboards</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6 px-6 grid lg:grid-cols-2 gap-4">
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <p className='font-bold'>Total Biaya Transaksi</p>
                    <canvas id="chart-cost" className='max-h-[300px]'></canvas>
                </div>

                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <p className='font-bold'>Total Barang Transaksi</p>
                    <canvas id="chart-unit" className='max-h-[300px]'></canvas>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
