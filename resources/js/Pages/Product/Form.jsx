import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatRupiah, ucWord } from '@/Utils/utilstext';
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useEffect } from 'react';

export default function Form(props) {
    const { data, setData, post, put, errors, processing } = useForm({
        id: '',
        name: '',
        brand_id: '',
        category_id: '',
        variant_id: '',
        price: '',
        stock: '',
        additional: '',
        image: null,
    });

    useEffect(() => {
        if(props.product){
            setData({
                id: props.product.id,
                name: props.product.name,
                brand_id: props.product.brand_id,
                category_id: props.product.category_id,
                variant_id: props.product.variant_id ?? '',
                price: props.product.price,
                stock: props.product.stock,
                additional: props.product.additional,
                image: null,
                _method: 'put',
            })
        }
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files[0] : event.target.value);
    };

    const onHandleRupiahChange = (event) => {
        setData(event.target.name, event.target.value.replace(/[^0-9]/g,''));
    };

    const submit = (e) => {
        e.preventDefault();

        data.id 
            ? post(route('product.update')) // cannot used method put if update file
            : post(route('product.store'));
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">{data.id? 'Edit' : 'Tambah'} Produk</h2>}
        >
            <Head title={`${data.id? 'Edit' : 'Tambah'} Produk`} />

            <div className="py-6 px-6">
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel forInput="name" value="Nama Produk" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="brand" value="Merek" />

                            <select id='brand' className="mt-1 block w-full border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm"
                            name='brand_id' onChange={onHandleChange} value={data.brand_id}>
                                <option value="">Pilih Merek</option>
                                {props.brands.map((item, i) => 
                                    <option key={i} value={item.id}>{ucWord(item.name)}</option> 
                                )}
                            </select>

                            <InputError message={errors.brand_id} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="category" value="Kategori" />

                            <select id='category' className="mt-1 block w-full border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm"
                            name='category_id' onChange={onHandleChange} value={data.category_id}>
                                <option value="">Pilih Kategori</option>
                                {props.categories.map((item, i) => 
                                    <option key={i} value={item.id}>{ucWord(item.name)}</option> 
                                )}
                            </select>

                            <InputError message={errors.category_id} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="variant" value="Varian" />

                            <select id='variant' className="mt-1 block w-full border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm"
                            name='variant_id' onChange={onHandleChange} value={data.variant_id}>
                                <option value="">Pilih Varian</option>
                                {props.variants.map((item, i) => 
                                    <option key={i} value={item.id}>{ucWord(item.name)}</option> 
                                )}
                            </select>

                            <InputError message={errors.variant_id} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="price" value="Harga Jual" />

                            <TextInput
                                id="price"
                                type="text"
                                name="price"
                                value={formatRupiah(data.price)}
                                className="mt-1 block w-full"
                                autoComplete="price"
                                handleChange={onHandleRupiahChange}
                            />

                            <InputError message={errors.price} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="stock" value="Stok Produk" />

                            <TextInput
                                id="stock"
                                type="text"
                                name="stock"
                                value={formatRupiah(data.stock)}
                                className="mt-1 block w-full"
                                autoComplete="stock"
                                handleChange={onHandleRupiahChange}
                            />

                            <InputError message={errors.stock} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="image">
                                <p>Gambar Produk</p>
                                <div className="mt-1 block w-full bg-white py-5 px-10 border border-gray-300 active:border-pinif-2 active:ring-pinif-2 rounded-md shadow-sm cursor-pointer">
                                    <i>
                                        <svg className='w-7 h-7 mx-auto' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" /></svg>
                                    </i>
                                    <p className='text-center mt-3'>Upload Gambar {data.image && ' : ' + data.image.name}</p>
                                    <p className='text-center text-sm text-pinif-2/80'>*File Harus bertipe image dan berukuran maksimal 1 MB</p>
                                </div>
                            </InputLabel>
                            <input type="file" name="image" id="image" accept='image/*' className='hidden' onChange={onHandleChange}/>

                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="additional" value="Keterangan" />

                            <textarea
                                id="additional"
                                name="additional"
                                rows={3}
                                value={data.additional ?? ''}
                                className="mt-1 block w-full border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm"
                                autoComplete="additional"
                                onChange={onHandleChange}
                            />

                            <InputError message={errors.additional} className="mt-2" />
                        </div>

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