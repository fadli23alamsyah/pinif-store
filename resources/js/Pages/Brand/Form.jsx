import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useEffect } from 'react';

export default function Form(props) {
    const { data, setData, post, put, errors, processing } = useForm({
        id: '',
        name: '',
    });

    useEffect(() => {
        if(props.brand){
            setData({
                id: props.brand.id,
                name: props.brand.name,
            })
        }
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files[0] : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        data.id 
            ? put(route('brand.update')) 
            : post(route('brand.store'));
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">{data.id? 'Edit' : 'Tambah'} Merek</h2>}
        >
            <Head title={`${data.id? 'Edit' : 'Tambah'} Merek`} />

            <div className="py-6 px-6">
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel forInput="name" value="Nama Merek" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                handleChange={onHandleChange}
                                required={true}
                            />

                            <InputError message={errors.name} className="mt-2" />
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