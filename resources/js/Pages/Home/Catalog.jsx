import IconFilterButton from "@/Components/IconFilterButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import HomeLayout from "@/Layouts/HomeLayout";
import { formatRupiah, ucWord } from "@/Utils/utilstext";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useRef, useState } from "react";
import './../../../css/custom.css'

export default function Catalog(props){
    const productImagesWrap = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [product, setProduct] = useState({})
    const [showFilter, setShowFilter] = useState(false);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({
        brand: 'all',
        category: 'all',
    });

    useEffect(()=>{
        setProducts(props.products)
        setFilter({
            brand: route().params.brand,
            category: route().params.category,
        })
    }, [])

    const onHandleChange = (event) => {
        setFilter((prevFilter) => ({...prevFilter, [event.target.name]: event.target.value}));
    };

    const handleFilter = () => {
        window.location.href = route('catalog', {brand: filter.brand, category: filter.category})
    }

    const showProduct = (product) => {
        setProduct(product)
        setShowModal(true)
    }

    const closeModal = () =>  {
        setShowModal(false)
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
            <Head title="Katalog" />

            <h3 className="text-center text-pinif-1 mt-10 text-5xl font-bold underline decoration-4 tracking-widest">
                Daftar Produk
            </h3>

            <section className='mx-8 lg:mx-28 mt-8 mb-20'>
                <div className="flex justify-between items-center mb-2">
                    <h3 className='font-extrabold tracking-widest text-2xl'>Semua Produk</h3>
                    <div className="relative w-fit h-fit">
                        <IconFilterButton title="Filter" onClick={() => setShowFilter(true)} />
                        <div className={`${showFilter ? 'block' : 'hidden'} fixed z-20 inset-0 bg-slate-300/10 backdrop-blur-sm sm:backdrop-blur-none sm:bg-transparent`} onClick={() => setShowFilter(false)}></div>
                        <div className={`${showFilter ? 'block' : 'hidden'} fixed sm:absolute z-20 w-full sm:min-w-[200px] right-0 bottom-0 sm:bottom-auto sm:top-full sm:mt-3 p-3 bg-white rounded-t-3xl sm:rounded-lg border-2 border-pinif-1`}>
                            <div className={`block sm:hidden relative w-8 h-1 rounded-full bg-gray-300 mb-4 mx-auto`}></div>
                            <div>
                                <InputLabel forInput="brand" value="Merek" />

                                <select id='brand' className="mt-1 w-full border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm cursor-pointer"
                                name='brand' onChange={onHandleChange} value={filter.brand}>
                                    <option value="all">Semua Merek</option>
                                    {props.brands.map((item, i) => 
                                        <option key={i} value={item.id}>{ucWord(item.name)}</option> 
                                    )}
                                </select>
                            </div>

                            <div className="mt-2">
                                <InputLabel forInput="category" value="Kategori" />

                                <select id='category' className="mt-1 w-full border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm cursor-pointer"
                                name='category' onChange={onHandleChange} value={filter.category}>
                                    <option value="all">Semua Kategori</option>
                                    {props.categories.map((item, i) => 
                                        <option key={i} value={item.id}>{ucWord(item.name)}</option> 
                                    )}
                                </select>
                            </div>

                            <PrimaryButton type="button" className="w-full text-center mt-4 justify-center" onClick={handleFilter}>Filter</PrimaryButton>
                        </div>
                    </div>
                </div>
                <div className="relative mb-4">
                    Filter : 
                        {route().params.brand && route().params.brand != 'all' ? ' Merek ' + props.brands.filter((brand, i) => brand.id == route().params.brand)[0]?.name : ' Semua Merek' }
                        {route().params.category && route().params.category!= 'all' ? ', Kategori ' + props.categories.filter((category, i) => route().params.category)[0]?.name : ', Semua Kategori' }
                </div>
                <div className='flex flex-wrap justify-evenly gap-4 select-none'>
                    {products.length != 0 
                        ? products.map((item,i) => 
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
                        : <p>Data yang anda cari belum ada</p>
                    }
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
                                {!product.images && (
                                    <div className="relative min-w-full py-10 overflow-hidden">
                                        <p className='font-freehand text-center font-semibold text-4xl text-pinif-1 drop-shadow-[0_0_0.1    rem_white]'>
                                            Pinif Store
                                        </p>
                                    </div>
                                )}
                            </ul>
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