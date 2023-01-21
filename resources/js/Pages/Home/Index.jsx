import HomeLayout from "@/Layouts/HomeLayout";
import { formatRupiah, ucWord } from "@/Utils/utilstext";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

export default function Index(props){
    const [popularProducts, setPopularProducts] = useState([{}]);
    const [newProducts, setNewProducts] = useState([]);

    useEffect(()=>{
        setPopularProducts(props.popular_products);
        setNewProducts(props.new_products);
    },[])

    return (
        <HomeLayout>
            <Head title="Situs Beli Produk Cosmetic Branded" />

            <section className='relative pt-20'>
                <div className='absolute inset-0 -z-10 blur-sm'>
                    <img 
                        src="/assets/static_images/bg-home.jpg" 
                        className='w-full h-[350px] md:max-h-[400px]'
                        style={{ maskImage: 'linear-gradient(to bottom, white 75%, transparent)', 
                            WebkitMaskImage: 'linear-gradient(to bottom, white 75%, transparent)'}}
                    />
                </div>
                <h1 className='font-freehand text-pinif-1 text-6xl md:text-8xl text-center drop-shadow-[0_0_0.4rem_white]'>Pinif Store</h1>
                <p className='tracking-widest text-center mt-6 px-7 drop-shadow-[0_0_0.4rem_white]'>
                    Toko yang menawarkan berbagai macam jenis produk kosmetik dari <span className='font-bold'>Brand - Brand Ternama</span>
                </p>
            </section>
            <section className='mt-16 md:mt-20 pb-10 overflow-x-hidden'>
                <div className='min-w-full -mx-20 md:-mx-6 lg:-mx-4 grid grid-cols-min-80px lg:grid-cols-10 gap-3 md:gap-4'>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/bioaqua.png" alt="bioaqua" />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/emina.png" alt="emina" />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/hanasui.png" className='brightness-0' alt="hanasui" />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/garnier.png" alt="garnier" />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/kahf.png" alt="kahf" />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/skintific.png" alt="skintific" />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/wardah.png" alt="wardah " />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/scarlett.png" alt="scarlett" />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/implora.png" className='brightness-0' alt="implora" />
                    </div>
                    <div className='bg-white shadow-md rounded-md p-1 md:p-3 w-fit select-none flex justify-center items-center'>
                        <img src="/assets/static_images/noera.jpg" alt="noera" />
                    </div>
                </div>
            </section>

            {/* Popular */}
            <section className='mx-8 lg:mx-28 mt-8 mb-20'>
                <h3 className='font-extrabold tracking-widest text-2xl mb-4'>Produk Populer</h3>
                <div className='flex flex-wrap justify-evenly gap-4'>
                    {popularProducts.length != 0 
                        ? popularProducts.map((item,i)=>
                            <div key={i} className='bg-white border-2 w-[200px] border-pinif-1 rounded-md overflow-hidden hover:drop-shadow-[0_0_0.2rem_rgb(233,119,119)] cursor-pointer'>
                                <div className='relative h-[200px] bg-pinif-1'>
                                    <img src={window.location.origin+'/images/'+ item.product?.image} alt={'Gambar ' + item.product?.name} className='absolute w-full h-full inset-0 object-cover' />
                                    <div className='absolute bottom-0 right-0 bg-teal-600 text-white text-sm px-[6px] py-[2px] rounded-tl-xl'>Sisa {item.product?.stock}</div>
                                </div>
                                <div className='p-1 flex flex-col'>
                                    <h5 className='tracking-tight text-sm text-ellipsis overflow-hidden' 
                                        style={{ display: '-webkit-box', lineClamp: '2', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical'}}>
                                        {ucWord(item.product?.name)}
                                    </h5>
                                    <p className='mt-3 text-pinif-1 text-base font-semibold'>Rp. {formatRupiah(item.product?.price || 0)}</p>
                                </div>
                            </div>)
                        : <p>Belum ada data</p>
                    }
                    {}
                </div>
            </section>

            {/* New */}
            <section className='mx-8 lg:mx-28 mt-8 mb-20'>
                <h3 className='font-extrabold tracking-widest text-2xl mb-4'>Produk Terbaru</h3>
                <div className='flex flex-wrap justify-evenly gap-4'>
                    {popularProducts.length != 0 
                        ? newProducts.map((item,i) => 
                            <div key={i} className='bg-white border-2 w-[200px] border-pinif-1 rounded-md overflow-hidden hover:drop-shadow-[0_0_0.2rem_rgb(233,119,119)] cursor-pointer'>
                                <div className='relative h-[200px] bg-pinif-1'>
                                    <img src={window.location.origin+'/images/'+ item.image} alt={'Gambar ' + item.name} className='absolute w-full h-full inset-0 object-cover' />
                                    <div className='absolute bottom-0 right-0 bg-teal-600 text-white text-sm px-[6px] py-[2px] rounded-tl-xl'>Sisa {item.stock}</div>
                                </div>
                                <div className='p-1 flex flex-col'>
                                    <h5 className='tracking-tight text-sm text-ellipsis overflow-hidden' 
                                        style={{ display: '-webkit-box', lineClamp: '2', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical'}}>
                                        {ucWord(item.name)}
                                    </h5>
                                    <p className='mt-3 text-pinif-1 text-base font-semibold'>Rp. {formatRupiah(item.price)}</p>
                                </div>
                            </div>)
                        : <p>Belum ada data</p>
                    }
                </div>
            </section>

            <section className='mx-8 md:mx-28 mt-8 mb-20'>
                <div className='bg-pinif-1 rounded-xl px-10 lg:px-60 py-10 text-white'>
                    <h3 className='text-center text-2xl font-bold'>Kamu NANYA? Daftar semua produk</h3>
                    <p className='mt-4 text-center'>
                        Anda dapat melihat semua produk yang dijual oleh <span className='font-bold'>PINIF STORE </span> 
                        di sosial media, di marketplace, di sini juga bisa kalo kamu mau.
                    </p>
                    <a href={route('catalog', {filter: 'all'})} className='w-fit bg-white mx-auto mt-8 block text-xl font-semibold text-pinif-1 px-10 py-3 rounded-full hover:shadow-md hover:shadow-white/50'>Iya Mau</a>
                </div>
            </section>
        </HomeLayout>
    )
}