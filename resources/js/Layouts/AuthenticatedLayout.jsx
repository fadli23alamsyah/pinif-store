import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Authenticated({ auth, header, children }) {
    const [showSideNav, setShowSideNav] = useState(false);

    return (
        <div className="max-h-screen flex bg-[#FFB9B9] box-border overflow-hidden">
            <nav className="min-h-screen max-w-[250px]">
                <div className="relative flex flex-col h-full">
                    <div className={`${showSideNav? 'mx-8' : 'mx-3'} mt-8 transition-all ease-in-out`}>
                        <Link href="/">
                            <ApplicationLogo className={`${showSideNav ? 'text-8xl' : 'text-xl'} transition-all ease-in-out`} />
                        </Link>
                    </div>
                    <div className='mt-10 flex flex-col mb-10 overflow-y-auto overflow-hidden'>
                        <NavLink 
                            openSide={showSideNav}
                            href={route('dashboard')} 
                            active={route().current('dashboard')}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="2.3"  stroke="currentColor" 
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            }
                        >
                        Dashboard
                        </NavLink>
                        {/* <NavLink 
                            openSide={showSideNav}
                            href={route('product')} 
                            active={route().current('finance')}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="2.3" 
                                    stroke="currentColor" 
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                </svg>
                            }
                        >
                        Keuangan
                        </NavLink> */}
                        <NavLink 
                            openSide={showSideNav}
                            href={route('product')} 
                            active={route().current().split('.')[0] == 'product'}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="2.3" 
                                    stroke="currentColor" 
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                </svg>
                            }
                        >
                        Barang
                        </NavLink>
                        <NavLink 
                            openSide={showSideNav}
                            href={route('brand')} 
                            active={route().current().split('.')[0] == 'brand'}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="2.3" 
                                    stroke="currentColor" 
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                                </svg>
                            }
                        >
                        Brand
                        </NavLink>
                        <NavLink 
                            openSide={showSideNav}
                            href={route('category')} 
                            active={route().current().split('.')[0] == 'category'}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="2.3" 
                                    stroke="currentColor" 
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            }
                        >
                        Kategori
                        </NavLink>
                        <NavLink 
                            openSide={showSideNav}
                            href={route('variant')} 
                            active={route().current().split('.')[0] == 'variant'}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="2.3" 
                                    stroke="currentColor" 
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                </svg>
                            }
                        >
                        Varian
                        </NavLink>
                        <NavLink 
                            openSide={showSideNav}
                            href={route('supplier')} 
                            active={route().current().split('.')[0] == 'supplier'}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="2.3" 
                                    stroke="currentColor" 
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                            }
                        >
                        Supplier
                        </NavLink>
                        <NavLink 
                            openSide={showSideNav}
                            href={route('invoice')} 
                            active={route().current().split('.')[0] == 'invoice'}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="2.3" 
                                    stroke="currentColor" 
                                    className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            }
                        >
                        Invoice
                        </NavLink>
                    </div>
                </div>
            </nav>

            <main className='relative min-w-[200px] max-h-screen flex-1 sm:w-full py-1 pl-1'>
                <div className={`relative w-full h-full flex flex-col shadow-inner rounded-l-[35px] bg-pinif-2 overflow-hidden sm:overflow-y-auto ${!showSideNav && 'overflow-y-auto'}`}>
                {showSideNav && <div className='absolute sm:hidden inset-0 rounded-l-[35px] z-40 bg-white/10 backdrop-blur-sm' onClick={() => setShowSideNav((previousState) => !previousState)}></div>}

                    <div className='flex justify-between items-center px-3 my-4 ml-6 py-3 rounded-l-full shadow-md bg-[#FFB9B9]'>
                        <div className="flex w-full items-center">
                            <button
                                onClick={() => setShowSideNav((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-pinif-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-pinif-2 transition duration-150 ease-in-out"
                            >
                                <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showSideNav ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="4"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showSideNav ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="4"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className='ml-3 hidden sm:inline-block'>
                                {header}
                            </div>
                        </div>
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-base leading-4 rounded-md text-white font-bold hover:bg-gray-100 hover:text-pinif-2 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {auth.user.name}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className='flex-1 w-full'>
                        <div className='block text-center sm:hidden'>
                            {header}
                        </div>
                        {children}
                    </div>

                    
                    <div className='text-center text-white text-sm'>
                        Created with ❤ by Palpal since 2023
                    </div>
                </div>
            </main>
        </div>
    );
}
