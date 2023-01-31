import { Link, } from '@inertiajs/inertia-react';

export default function HomeLayout({ children }){
    return (
        <div className='box-border min-h-screen w-full flex flex-col'>
            {/* Header */}
            <header className='bg-white shadow-md sticky top-0 z-20'>
                <div id='top-header'className='bg-slate-100 py-[6px] text-xs'>
                    <p className='w-fit text-slate-500 mx-auto hover:text-pinif-1'>Official Website Pinif Store</p>
                </div>
                <div className='py-4 px-8 flex justify-between items-center'>
                    {/* logo */}
                    <Link href='/' className='font-freehand font-semibold text-4xl text-pinif-1 hover:drop-shadow-[0_0_0.2rem_rgb(233,119,119)]'>
                        Pinif Store
                    </Link>

                    {/* Menu */}
                    <div id='main-menu' className='font-bold'>
                        <a href={route('catalog', {brand: 'all', category: 'all'})} className='hover:text-pinif-1'>Katalog</a>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className='flex-1'>
                {children}
            </main>

            {/* WA */}
            <div className='sticky flex justify-end bottom-4 mb-4 mr-4 box-border'>
                <div className='max-w-fit max-h-fit bg-white border-1 transition-all hover:border-2 border-pinif-1 rounded-full p-2'>
                    <a href="https://wa.me/6282394622242?text=Saya%20mau%20bertanya%20min,%20....?" target='_blank'>
                        <img src="/assets/static_images/wa.png" className='w-8 h-8' alt="instagram" />
                    </a>
                </div>
            </div>

            <footer className='bg-pinif-1 shadow-[0px_-2px_8px_0px] shadow-pinif-1'>
                <div className='py-4 px-8 flex justify-between items-center'>
                    <p className='text-white font-bold'>Temukan Pinif Store 👉</p>
                    <div id="find-me" className='flex gap-3 items-center'>
                        <a href='https://goo.gl/maps/yARyHuTd2RUMner37' target='_blank' className='bg-white rounded-md p-1'>
                            <img src="https://w7.pngwing.com/pngs/329/734/png-transparent-google-maps-location-zion-text-logo-sign.png" className='w-8 h-8' alt="instagram" />
                        </a>
                        <a href='https://shopee.co.id/putriwdynr' target='_blank' className='bg-white rounded-md p-1'>
                            <img src="/assets/static_images/shopee.png" className='w-8 h-8' alt="instagram" />
                        </a>
                        <a href='https://www.instagram.com/pinifstore/' target='_blank' className='bg-white rounded-md p-1'>
                            <img src="/assets/static_images/ig.png" className='w-8 h-8' alt="instagram" />
                        </a>
                    </div>
                </div>
                <div className='bg-slate-100 py-[6px] text-xs'>
                    <p className='w-fit text-slate-500 mx-auto hover:text-pinif-1'>Created with ❤ by Palpal</p>
                </div>
            </footer>
        </div>
    )
}