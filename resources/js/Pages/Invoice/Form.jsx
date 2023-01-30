import DangerButton from '@/Components/DangerButton';
import IconAddButton from '@/Components/IconAddButton';
import IconDeleteButton from '@/Components/IconDeleteButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatRupiah, ucWord } from '@/Utils/utilstext';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useEffect, useState } from 'react';

export default function Form(props) {
    const [sumTotal, setSumTotal] = useState(0)
    const { data, setData, post, put, errors, processing } = useForm({
        op: '',
        id: '',
        supplier_id: '',
        customer_id: '',
        name: '',
        address: '',
        phone: '',
        date: '',
        transactions: [{
            id: '',
            product_id: '',
            price: '',
            unit: '',
            total: '',
        }],
    });

    useEffect(() => {
        setData("op", props.op);

        if(props.invoice){
            let allTransaction = props.invoice.transactions
            allTransaction.map((val) =>{
                delete val.created_at
                delete val.updated_at

                val.total = val.price * val.unit
            })

            setData({
                op: props.op,
                id: props.invoice.id,
                supplier_id: props.invoice.supplier_id,
                customer_id: props.invoice.customer_id,
                name: props.invoice.customer?.name || '',
                address: props.invoice.customer?.address || '',
                phone: props.invoice.customer?.phone || '',
                date: props.invoice.date || '',
                transactions: allTransaction,
            });
        }
    }, []);

    useEffect(() => {
        let sum = 0;
        data.transactions.map((value) => sum = sum + (value.price * value.unit))
        setSumTotal(sum)
    },[data])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files[0] : event.target.value);
    };

    const onHandleChangeTransaction = (event, index) => {
        const {name, value} = event.target
        let list = data.transactions
        list[index][name] = value
        setData("transactions", list);
    };

    const onHandleRupiahChangeTransaction = (event, index) => {
        const {name, value} = event.target
        let list = data.transactions
        list[index][name] = value.replace(/[^0-9]/g,'')
        list[index]["total"] = list[index].price * list[index].unit
        setData("transactions", list);
    };

    const onHandleAdd = () => {
        setData(
            "transactions", [
                ...data.transactions,
                {
                    id: '',
                    product_id: '',
                    price: '',
                    unit: '',
                    total: '',
                }
            ]
        )
    }

    const onHandleDelete = (index) => {
        const list = data.transactions
        list.splice(index,1);
        setData("transactions", list)
    }

    const submit = (e) => {
        e.preventDefault();

        (data.transactions.length != 0)
            ? data.id 
                ? put(route('invoice.update')) 
                : post(route('invoice.store'))
            : alert("Data transaksi tidak ada")
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">{data.id? 'Edit' : 'Tambah'} Invoice {ucWord(props.op || '')}</h2>}
        >
            <Head title={`${data.id? 'Edit' : 'Tambah'} Invoice`} />

            <div className="py-6 px-6">
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <form onSubmit={submit}>
                        {(data.op == 'customer')
                            ? <div className='flex flex-wrap'>
                                <div className='w-full md:w-1/2 pr-0 md:pr-2'>
                                    <InputLabel forInput="date" value="Tanggal Penjualan" />

                                    <TextInput
                                        id="date"
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        className="mt-1 block w-full"
                                        autoComplete="date"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required={true}
                                    />

                                    <InputError message={errors.date} className="mt-2" />
                                </div>

                                <div className='mt-4 md:mt-0 w-full md:w-1/2 pl-0 md:pl-2'>
                                    <InputLabel forInput="name" value="Nama Pelanggan" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        handleChange={onHandleChange}
                                        required={true}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className='mt-4 w-full md:w-1/2 pr-0 md:pr-2'>
                                    <InputLabel forInput="address" value="Alamat" />

                                    <TextInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        autoComplete="address"
                                        handleChange={onHandleChange}
                                        required={true}
                                    />

                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                <div className='mt-4 w-full md:w-1/2 pl-0 md:pl-2'>
                                    <InputLabel forInput="phone" value="Telpon" />

                                    <TextInput
                                        id="phone"
                                        type="number"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        autoComplete="phone"
                                        handleChange={onHandleChange}
                                        required={true}
                                    />

                                    <InputError message={errors.phone} className="mt-2" />
                                </div>
                            </div>
                            : <div className='flex flex-wrap'>
                                <div className='w-full md:w-1/2 pr-0 md:pr-2'>
                                    <InputLabel forInput="date" value="Tanggal Penjualan" />

                                    <TextInput
                                        id="date"
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        className="mt-1 block w-full"
                                        autoComplete="date"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required={true}
                                    />

                                    <InputError message={errors.date} className="mt-2" />
                                </div>

                                <div className='mt-4 md:mt-0 w-full md:w-1/2 pl-0 md:pl-2'>
                                    <InputLabel forInput="supplier" value="Supplier" />

                                    <select id='supplier' className="mt-1 block w-full border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm" name='supplier_id' value={data.supplier_id}
                                    onChange={onHandleChange} required="required">
                                        <option value="">Pilih Supplier</option>
                                        {props.suppliers.map((item, i)=> <option key={i} value={item.id}>{ucWord(item.name)}</option> )} 
                                    </select>

                                    <InputError message={errors.supplier_id} className="mt-2" />
                                </div>
                            </div>
                        }

                        {/* Input Transaction */}
                        <table className='w-full mt-4'>
                            <thead className='text-pinif-1'>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Harga</th>
                                    <th>Jumlah Satuan</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.transactions.map((value, index) => 
                                    <tr key={index}>
                                        <td>
                                            <select id='product' className="mt-1 block w-full border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm" 
                                            required="required" name='product_id' value={data.transactions[index].product_id}
                                            onChange={(e) => onHandleChangeTransaction(e, index)} >
                                                <option value="">Pilih Produk</option> 
                                                {props.products.map((item, i)=> {
                                                    if(data.transactions.some((trans) => trans.product_id == item.id) && item.id != data.transactions[index].product_id) return false
                                                    return <option key={i} value={item.id}>{(item.variant_id ? ucWord(item.variant.name) + ' - ' : '') + ucWord(item.name)}</option>
                                                })}
                                            </select>

                                            <InputError message={errors.transactions} className="mt-2" />
                                        </td>
                                        <td>
                                            <TextInput
                                                id="price"
                                                type="text"
                                                name="price"
                                                value={formatRupiah(data.transactions[index].price)}
                                                className="mt-1 block w-full"
                                                autoComplete="price"
                                                handleChange={(e) => onHandleRupiahChangeTransaction(e, index)}
                                                required={true}
                                            />

                                            <InputError message={errors.transactions} className="mt-2" />
                                        </td>
                                        <td>
                                            <TextInput
                                                id="unit"
                                                type="text"
                                                name="unit"
                                                value={formatRupiah(data.transactions[index].unit)}
                                                className="mt-1 block w-full"
                                                autoComplete="unit"
                                                handleChange={(e) => onHandleRupiahChangeTransaction(e, index)}
                                                required={true}
                                            />

                                            <InputError message={errors.transactions} className="mt-2" />
                                        </td>
                                        <td>
                                            <p>Rp. {formatRupiah(data.transactions[index].total || 0)}</p>
                                        </td>
                                        <td>
                                            {data.transactions.length-1 == index 
                                                ? <>
                                                    {index != 0 && <IconDeleteButton onClick={() => onHandleDelete(index)} />}
                                                    {data.transactions.length < props.products.length && <IconAddButton onClick={onHandleAdd} />}
                                                </> 
                                                : <IconDeleteButton onClick={() => onHandleDelete(index)} />
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <p className='mt-8'>Total Keselutuhan : Rp. {formatRupiah(sumTotal)}</p>

                        <div className="flex items-center justify-end mt-4">
                            <DangerButton type='button' onClick={() => window.history.back()}>Kembali</DangerButton>
                            <PrimaryButton className="ml-4" processing={processing}>
                                Simpan
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}