export default function ApplicationLogo({ className }) {
    return (
        <h1 className={`${className} font-bold font-freehand text-pinif-1 drop-shadow-[0_0_0.2rem_white]`}>
            Pinif <span className="text-[65%] font-thin text-[#FF865E] block -mt-10">store</span>
        </h1>
    );
}
