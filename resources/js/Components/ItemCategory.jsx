export default function ItemCategory({href, title, active}){
    return (
        <li>
            <a 
                href={href} 
                className={`slide-category px-4 py-2 rounded-full text-sm border border-pinif-1 ${
                    active 
                        ? 'bg-pinif-1 font-semibold text-white shadow-md shadow-pinif-1/50'
                        :' bg-white text-pinif-1 hover:shadow-md hover:shadow-pinif-1/50'
                } `}
            >
                    {title}
            </a>
        </li>
    )
}