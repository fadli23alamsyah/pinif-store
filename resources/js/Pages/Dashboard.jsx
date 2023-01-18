import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Chart } from 'chart.js/auto'; // for use Line Chartjs-2
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard(props) {
    const labels = ["Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"]

    const [filterYear, setFilterYear] = useState([])
    const [totalSale, setTotalSale] = useState([])
    const [totalPurchase, setTotalPurchase] = useState([])
    const [unitsSale, setUnitsSale] = useState([])
    const [unitsPurchase, setUnitsPurchase] = useState([])

    useEffect(()=>{
        setFilterYear(props.filterYear)

        setTotalSale(props.chart.totalSale)

        setTotalPurchase(props.chart.totalPurchase)

        setUnitsSale(props.chart.unitsSale)

        setUnitsPurchase(props.chart.unitsPurchase)
    }, [])

    const onHandleChange = (filter, e)=>{
        const {value} = e.target
        
        if(filter == "cost")
            axios.get(route('dashboard.filterCost', {filter: value}))
            .then((response)=>{
                if(response.status == 200){
                    setTotalSale(response.data.totalSale)
                    setTotalPurchase(response.data.totalPurchase)
                }
            })
        else
            axios.get(route('dashboard.filterUnits', {filter: value}))
            .then((response)=>{
                if(response.status == 200){
                    setUnitsSale(response.data.unitsSale)
                    setUnitsPurchase(response.data.unitsPurchase)
                }
            })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6 px-6 grid-cols-1 grid lg:grid-cols-2 gap-4">
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <div className='flex justify-between items-center mb-2'>
                        <p className='font-bold'>Total Biaya Transaksi</p>
                        <select 
                            className="float-right border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm" 
                            value={new Date().getFullYear()}
                            onChange={(e)=>onHandleChange('cost', e)}
                        >
                            {filterYear.map((year, i) => <option key={i} value={year}>{year}</option>)}
                        </select>
                    </div>
                    <Line className='max-h-[300px]' data={{ 
                        labels: labels,
                        datasets: [
                            {
                                label: 'Penjualan',
                                data: totalSale,
                                fill: false,
                                borderColor: 'rgb(0, 213, 0)',
                                tension: 0.1
                            },
                            {
                                label: 'Pembelian',
                                data: totalPurchase,
                                fill: false,
                                borderColor: 'rgb(213, 0, 0)',
                                tension: 0.1
                            },
                        ]
                    }} />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <div className='flex justify-between items-center mb-2'>
                        <p className='font-bold'>Total Barang Transaksi</p>
                        <select 
                            className="float-right border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm" 
                            value={new Date().getFullYear()}
                            onChange={(e)=>onHandleChange('units', e)}
                        >
                            {filterYear.map((year, i) => <option key={i} value={year}>{year}</option>)}
                        </select>
                    </div>
                    <Line className='max-h-[300px]' data={{ 
                        labels: labels,
                        datasets: [
                            {
                                label: 'Penjualan',
                                data: unitsSale,
                                fill: false,
                                borderColor: 'rgb(0, 213, 0)',
                                tension: 0.1
                            },
                            {
                                label: 'Pembelian',
                                data: unitsPurchase,
                                fill: false,
                                borderColor: 'rgb(213, 0, 0)',
                                tension: 0.1
                            },
                        ]
                    }} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
