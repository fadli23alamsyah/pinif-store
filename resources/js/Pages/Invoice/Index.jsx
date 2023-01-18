import Datatables from '@/Components/Datatables';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState } from 'react';
import { formatRupiah, ucWord } from '@/Utils/utilstext';
import IconDeleteButton from '@/Components/IconDeleteButton';
import IconEditButton from '@/Components/IconEditButton';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {
    const [showDelete, setShowDelete] = useState(false)
    const [message, setMessage] = useState(props.flash.message)
    const [invoice, setInvoice] = useState({})

    useEffect(()=>{
        setTimeout(()=>{
            props.flash.isSuccess = null
            props.flash.message = null
            setMessage('')
        }, 1500)
    },[])

    const showModalDelete = (invoice) => {
        setShowDelete(true)
        setInvoice(invoice)
    }
    
    const closeModalDelete = () => {
        setShowDelete(false)
        setInvoice({})
    }

    const destroy = () => {
        Inertia.visit(route('invoice.destroy'),{
            method: 'delete',
            data: invoice
        })
        setInvoice({})
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Daftar Invoice</h2>}
        >
            <Head title="Daftar Invoice" />

            <div className="py-6 px-6">
                {message && (
                    <div className={`${props.flash.isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md mb-5 text-lg font-semibold`}>{message}</div>
                )}
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <div className='mb-10 float-right flex flex-wrap gap-1'>
                        <PrimaryButton
                            type='button'
                            onClick={ () => window.location.href = route('invoice.add', {op: 'supplier'})}
                        >Supplier</PrimaryButton>
                        <PrimaryButton
                            type='button'
                            onClick={ () => window.location.href = route('invoice.add', {op: 'customer'})}
                        >Pelanggan</PrimaryButton>
                    </div>
                    <Datatables>
                        <thead className='bg-pinif-2 text-white'>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Invoice</th>
                                <th>Total</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, i) => 
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{new Date(item.date).toLocaleDateString('id-ID')}</td>
                                    <td>{item.supplier_id != null ? ucWord(item.supplier.name) : ucWord(item.customer.name)}</td>
                                    <td>{formatRupiah(item.total)}</td>
                                    <td>
                                        <div className='flex flex-wrap gap-2'>
                                            <IconEditButton onClick={() => window.location.href = route('invoice.edit',item)} />
                                            <IconDeleteButton onClick={() => showModalDelete(item)} />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Datatables>
                </div>
            </div>
            
            {/* Modal Delete */}
            <Modal show={showDelete} maxWidth="md" onClose={closeModalDelete}>
                <div className="p-4">
                    <h3 className="text-center text-xl font-bold">Hapus Data</h3>
                    <div className="mt-4">Apakah anda yakin ingin menghapus data {invoice.date !== undefined ? invoice.date : ''}</div>
                    <div className="mt-5 mb-3 float-right">
                        <DangerButton type="button" onClick={closeModalDelete}>
                            Tutup
                        </DangerButton>
                        <PrimaryButton type="button" onClick={destroy} className="sm:ml-2 sm:mt-0 mt-2">
                            Hapus
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
            
        </AuthenticatedLayout>
    );
}