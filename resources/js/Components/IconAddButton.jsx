export default function IconAddButton({className, type = 'button', onClick , title = ''}){
    return (
        <button title={title} className={`${className} bg-blue-500 p-2 text-white rounded-md hover:bg-blue-400`}
            type={type}
            onClick={onClick}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    )
}