import { Link } from '@inertiajs/inertia-react';
import { useEffect, useState } from 'react';

export default function NavLink({ href, openSide, active, icon, children }) {
    const [transition, setTransition] = useState('transition-all')

    useEffect(()=>{
        setTimeout(()=>{
            setTransition(transition ? '' : 'transition-all')
        }, 500)
    },[openSide])

    return (
        <Link
            href={href}
            className={`
                flex group items-center px-1 pt-1 text-lg font-semibold leading-5 focus:outline-none
                ${openSide ? 'pl-5 justify-start' : 'mx-auto'}
                ${active
                    ? ` ${openSide ? 'text-white' : 'text-pinif-1'} transition ease-in-out`
                    : `text-pinif-1 ${openSide ? 'hover:text-white focus:text-white' : ''} transition ease-in-out`}
            `}
        >
            {icon && 
                <div className={`${active ? 'text-pinif-2 bg-white' : 'text-white'} group-hover:text-pinif-2 group-hover:bg-white p-2 rounded-md`}>
                    {icon}
                </div>
            }
            <div className={`
                ${openSide
                    ? 'ml-4'
                    : `w-0 invisible opacity-0 group-hover:visible group-hover:w-min group-hover:opacity-100 
                    group-hover:block group-hover:absolute group-hover:left-0 group-hover:bg-white group-hover:px-3 group-hover:py-2 
                    group-hover:rounded-md group-hover:ml-14 group-hover:drop-shadow-[0_0_0.1rem_#808080] group-hover:z-50
                    group-hover:before:absolute group-hover:before:w-4 group-hover:before:h-4 
                    group-hover:before:bg-white group-hover:before:rounded-lg
                    group-hover:before:rotate-45 group-hover:before:-left-[8px] group-hover:before:top-[10px]`
                }
                ${transition}
            `}>
                {children}
            </div>
        </Link>
    );
}
