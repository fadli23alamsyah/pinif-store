import ItemCategory from "@/Components/ItemCategory";
import HomeLayout from "@/Layouts/HomeLayout";
import { formatRupiah, ucWord } from "@/Utils/utilstext";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useRef, useState } from "react";
import './../../../css/custom.css'

export default function Catalog(props){
    const slideWrap = useRef(null)
    const [slide, setSlide] = useState([])
    const [widthWrap, setWidthWrap] = useState()
    
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [showArrow, setShowArrow] = useState(true)

    useEffect(()=>{
        setCategories(props.categories)
        setProducts(props.products)
    }, [])

    useEffect(()=>{
        setSlide(slideWrap.current.querySelectorAll(".slide-category"))
        setWidthWrap(slideWrap.current.clientWidth)

        setShowArrow((widthWrap >= slideWrap.current.scrollWidth)? false : true) 
        
        addEventListener("resize", (event) => {
            setWidthWrap(slideWrap.current.clientWidth)

            setShowArrow((slideWrap.current.clientWidth >= slideWrap.current.scrollWidth)? false : true)
        });
    },[categories])
    
    const prevButton = () =>{
        for(let i=0; i < slide.length; i++){
            let countSlide = slide[i].offsetLeft + slide[i].offsetWidth
            if(countSlide > widthWrap){
                slideWrap.current.scrollLeft -= slide[i].offsetLeft - 8
                break;
            }
        }
    }

    const nextButton = () =>{
        for(let i=0; i < slide.length; i++){
            let countSlide = slide[i].offsetLeft + slide[i].offsetWidth
            if(countSlide > widthWrap){
                slideWrap.current.scrollLeft += slide[i].offsetLeft - 8
                break;
            }
        }
    }

    return (
        <HomeLayout>
            <Head title="Katalog" />

            <h3 className="text-center text-pinif-1 mt-10 text-5xl font-bold underline decoration-4 tracking-widest">
                Daftar Produk
            </h3>

            <section className='mx-8 lg:mx-28 mt-8 mb-20'>
                <h3 className='font-extrabold tracking-widest text-2xl mb-2'>Semua Produk</h3>
                <div className="group relative mb-4">
                    {showArrow && (
                        <>
                            <button className="hidden absolute -left-2 bottom-0 top-0 md:flex items-center opacity-0 transition-all 
                                group-hover:opacity-100 group-hover:-left-8"
                                onClick={prevButton}>
                                <span className="bg-white border-2 border-pinif-1 rounded-full p-1 hover:bg-pinif-2">👈</span>
                            </button>   
                            <button className="hidden absolute -right-2 bottom-0 top-0 md:flex items-center opacity-0 transition-all 
                                group-hover:opacity-100 group-hover:-right-8"
                                onClick={nextButton}>
                                <span className="bg-white border-2 border-pinif-1 rounded-full p-1 hover:bg-pinif-2">👉</span>
                            </button>
                        </>
                    )}
                    <ul ref={slideWrap} className="w-full flex gap-2 overflow-x-auto py-3 my-auto scroll-smooth" id="category-catalog">
                        <ItemCategory href={route('catalog', {filter: 'all'})} title="Semua" active={route().current("catalog", {filter: 'all'}) || route().current("catalog", {filter: ''})}/>
                        {categories.map((v,i) => <ItemCategory key={i} href={route('catalog', {filter: v.name})} title={ucWord(v.name)} active={route().current("catalog", {filter: v.name})}/> )}
                    </ul>
                </div>
                <div className='flex flex-wrap justify-evenly gap-4 select-none'>
                    {products.map((product,i) => 
                        <div key={i} className='bg-white border-2 w-[200px] border-pinif-1 rounded-md overflow-hidden hover:drop-shadow-[0_0_0.2rem_rgb(233,119,119)] cursor-pointer'>
                            <div className='relative h-[200px] bg-pinif-1'>
                                <img src={window.location.origin+'/images/'+ product.image} alt={'Gambar ' + product.name} className='absolute w-full h-full inset-0 object-cover' />
                                <div className='absolute bottom-0 right-0 bg-teal-600 text-white text-sm px-[6px] py-[2px] rounded-tl-xl'>Sisa {product.stock}</div>
                            </div>
                            <div className='p-1 flex flex-col'>
                                <h5 className='tracking-tight text-sm text-ellipsis overflow-hidden' 
                                    style={{ display: '-webkit-box', lineClamp: '2', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical'}}>
                                    {ucWord(product.name)}
                                </h5>
                                <p className='mt-3 text-pinif-1 text-base font-semibold'>Rp. {formatRupiah(product.price)}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </HomeLayout>
    )
}