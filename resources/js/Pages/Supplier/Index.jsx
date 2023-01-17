import Datatables from '@/Components/Datatables';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState } from 'react';
import { ucWord } from '@/Utils/utilstext';
import IconDeleteButton from '@/Components/IconDeleteButton';
import IconEditButton from '@/Components/IconEditButton';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {
    const [showDelete, setShowDelete] = useState(false)
    const [message, setMessage] = useState(props.flash.message)
    const [supplier, setSupplier] = useState({})

    useEffect(()=>{
        setTimeout(()=>{
            props.flash.isSuccess = null
            props.flash.message = null
            setMessage('')
        }, 1500)
    },[])

    const showModalDelete = (supplier) => {
        setShowDelete(true)
        setSupplier(supplier)
    }
    
    const closeModalDelete = () => {
        setShowDelete(false)
        setSupplier({})
    }

    const destroy = () => {
        Inertia.visit(route('supplier.destroy'),{
            method: 'delete',
            data: supplier
        })
        setSupplier({})
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Daftar Supplier</h2>}
        >
            <Head title="Daftar Supplier" />

            <div className="py-6 px-6">
                {message && (
                    <div className={`${props.flash.isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md mb-5 text-lg font-semibold`}>{message}</div>
                )}
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <PrimaryButton
                        type='button'
                        className='mb-10 float-right'
                        onClick={ () => window.location.href = route('supplier.add')}
                    >Tambah</PrimaryButton>
                    <Datatables>
                        <thead className='bg-pinif-2 text-white'>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>No. Hp</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((item, i) => 
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{ucWord(item.name)}</td>
                                    <td>{ucWord(item.address)}</td>
                                    <td>{ucWord(item.phone)}</td>
                                    <td>
                                        <div className='flex flex-wrap gap-2'>
                                            <IconEditButton onClick={() => window.location.href = route('supplier.edit',item)} />
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
                    <div className="mt-4">Apakah anda yakin ingin menghapus data {supplier.name !== undefined ? supplier.name : ''}</div>
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