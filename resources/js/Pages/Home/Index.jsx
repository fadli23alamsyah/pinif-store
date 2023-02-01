import HomeLayout from "@/Layouts/HomeLayout";
import { formatRupiah, ucWord } from "@/Utils/utilstext";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useRef, useState } from "react";
import Modal from "@/Components/Modal";
import './../../../css/custom.css'

export default function Index(props){
    const productImagesWrap = useRef(null)
    const [popularProducts, setPopularProducts] = useState([{}]);
    const [newProducts, setNewProducts] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [product, setProduct] = useState({})

    useEffect(()=>{
        setPopularProducts(props.popular_products);
        setNewProducts(props.new_products);
    },[])

    const showProduct = (product) => {
        setProduct(product)
        setShowModal((prev) => !prev)
    }

    const closeModal = () => {
        setShowModal((prev) => !prev)
    }

    const prevButton = (event) => {
        event.preventDefault()
        productImagesWrap.current.scrollLeft -= productImagesWrap.current.clientWidth
    }

    const nextButton = (event) => {
        event.preventDefault()
        productImagesWrap.current.scrollLeft += productImagesWrap.current.clientWidth
    }

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
                            <div key={i} className='flex flex-col bg-white border-2 w-[200px] border-pinif-1 rounded-md overflow-hidden hover:drop-shadow-[0_0_0.2rem_rgb(233,119,119)] cursor-pointer'>
                                <div className='relative flex h-[200px] bg-pinif-1'>
                                    {item.product?.image 
                                        ? <img src={window.location.origin+'/images/'+ item.product?.image} alt={'Gambar ' + item.product?.name} className='absolute w-full h-full inset-0 object-cover' />
                                        : <p className='font-freehand font-semibold m-auto text-4xl text-pinif-1 drop-shadow-[0_0_0.2rem_rgb(233,119,119)]'>
                                            Pinif Store
                                        </p>
                                    }
                                    <div className='absolute bottom-0 right-0 bg-teal-600 text-white text-sm px-[6px] py-[2px] rounded-tl-xl'>Sisa {item.product?.stock}</div>
                                </div>
                                <div className='p-1 flex-grow flex-shrink-0 basis-auto flex flex-col'>
                                    <h5 className='flex-grow flex-shrink-0 basis-auto tracking-tight text-sm text-ellipsis overflow-hidden' 
                                        style={{ display: '-webkit-box', lineClamp: '2', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical'}}>
                                        {(item.product?.variant ? ucWord(item.product?.variant.name) + ' - '  : '') + ucWord(item.product?.name)}
                                    </h5>
                                    <p className='text-pinif-1 text-base font-semibold'>Rp. {formatRupiah(item.product?.price || 0)}</p>
                                </div>
                            </div>)
                        : <p>Belum ada produk</p>
                    }
                </div>
            </section>

            {/* New */}
            <section className='mx-8 lg:mx-28 mt-8 mb-20'>
                <h3 className='font-extrabold tracking-widest text-2xl mb-4'>Produk Terbaru</h3>
                <div className='flex flex-wrap justify-evenly gap-4'>
                    {newProducts.length != 0 
                        ? newProducts.map((item,i) => 
                            <div key={i} 
                                className='flex flex-col bg-white border-2 w-[200px] border-pinif-1 rounded-md overflow-hidden hover:drop-shadow-[0_0_0.2rem_rgb(233,119,119)] cursor-pointer'
                                onClick={() => showProduct(item)}>
                                <div className='relative flex h-[200px] bg-white'>
                                    {item.images[0] 
                                        ? <img src={window.location.origin+'/images/'+ item.images[0]} alt={'Gambar ' + item.name} className='absolute w-full h-full inset-0 object-cover' />
                                        : <p className='font-freehand font-semibold m-auto text-4xl text-pinif-1 drop-shadow-[0_0_0.2rem_rgb(233,119,119)]'>
                                            Pinif Store
                                        </p>
                                    }
                                    <div className='absolute bottom-0 right-0 bg-teal-600 text-white text-sm px-[6px] py-[2px] rounded-tl-xl'>Sisa {item.stock}</div>
                                </div>
                                <div className='p-1 flex-grow flex-shrink-0 basis-auto flex flex-col'>
                                    <h5 className='flex-grow flex-shrink-0 basis-auto tracking-tight text-sm text-ellipsis overflow-hidden' 
                                        style={{ display: '-webkit-box', lineClamp: '2', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical'}}>
                                        {ucWord(item.name)}
                                    </h5>
                                    {item.variant_id != null && <p className="text-xs bg-orange-500 w-fit text-white px-2 rounded-full">Terdapat Varian</p>}
                                    <p className='text-pinif-1 text-base font-semibold'>Rp. {formatRupiah(item.prices[0])}</p>
                                </div>
                            </div>)
                        : <p>Belum ada produk</p>
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
                    <a href={route('catalog', {brand: 'all', category: 'all'})} className='w-fit bg-white mx-auto mt-8 block text-xl font-semibold text-pinif-1 px-10 py-3 rounded-full hover:shadow-md hover:shadow-white/50'>Iya Mau</a>
                </div>
            </section>

            {/* Show Product */}
            <Modal show={showModal} onClose={closeModal}>
                <div className="p-4">
                    <h3 className="font-bold text-center text-lg mb-3">{ucWord(product.name)}</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Images */}
                        <div className="group relative sm:w-1/2 h-fit bg-pinif-1 rounded-lg cursor-pointer border-2 border-pinif-1">
                            {product.images?.length > 1 && (
                                <>
                                    <button className="hidden z-10 absolute outline-0 left-4 top-0 bottom-0 md:flex items-center opacity-0 transition-all 
                                        group-hover:opacity-100 group-hover:-left-2"
                                        onClick={prevButton}>
                                        <span className="bg-white border-2 border-pinif-1 rounded-full p-1 hover:bg-pinif-2">👈</span>
                                    </button>
                                    <button className="hidden z-10 absolute outline-0 right-4 bottom-0 top-0 md:flex items-center opacity-0 transition-all 
                                        group-hover:opacity-100 group-hover:-right-2"
                                        onClick={nextButton}>
                                        <span className="bg-white border-2 border-pinif-1 rounded-full p-1 hover:bg-pinif-2">👉</span>
                                    </button>
                                </>
                            )}

                            <ul id="product-images" ref={productImagesWrap}
                                className="relative flex bg-pinif-1 rounded-lg overflow-x-auto cursor-pointer border-2 border-pinif-1 scroll-smooth snap-x snap-mandatory">
                                {product.images?.map((image, i) =>
                                    <div key={i} className="relative min-w-full pt-[100%] snap-center">
                                        <img
                                            src={window.location.origin+'/images/'+ image} 
                                            alt={'Gambar ' + product.name} 
                                            className='absolute w-full h-full inset-0 object-cover' />
                                    </div>
                                )}
                                {!product.images?.length && (
                                    <div className="relative min-w-full py-10 overflow-hidden">
                                        <p className='font-freehand text-center font-semibold text-4xl text-pinif-1 drop-shadow-[0_0_0.1rem_white]'>
                                            Pinif Store
                                        </p>
                                    </div>
                                )}
                            </ul>
                            <span className="absolute flex items-center gap-[6px] bottom-2 right-2 text-white bg-pinif-1 rounded-full py-[2px] px-[10px] shadow-md shadow-pinif-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <p className="font-extrabold">{product.images?.length}</p>
                            </span>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col sm:w-1/2">
                            <h3 className="font-bold text-lg underline">Detail Produk</h3>
                            <table width="100%" className="text-lg mb-3">
                                <tbody>
                                    <tr>
                                        <td className="w-0">Harga</td>
                                        <td className="w-0 px-2">:</td>
                                        <td className="text-pinif-1 font-bold">Rp. {
                                            product.prices && (formatRupiah(product.prices[0]) + (
                                                product.prices.length > 1
                                                    ? ' - ' + formatRupiah(product.prices[product.prices.length-1])
                                                    : ''
                                                ))
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td>Stok</td>
                                        <td className="px-2">:</td>
                                        <td className="text-pinif-1 font-bold">{formatRupiah(product.stock ?? 0)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3 className="font-bold text-lg underline mb-2">Varian Produk</h3>
                            <div className="flex flex-wrap gap-2">
                                {
                                    product.variants?.length > 0 
                                        ? product.variants.map((item, i) => (
                                            <div key={i} className="bg-pinif-1 rounded-md p-2 text-white text-xs">
                                                <p className="mb-1 text-sm">{item.name}</p>
                                                <p>Sisa {formatRupiah(item.stock)}</p>
                                                <p>Rp. {formatRupiah(item.price)}</p>
                                            </div>
                                        ))
                                        : <p>Tidak ada varian</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </HomeLayout>
    )
}