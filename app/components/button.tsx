import { useMemo } from "react";

const Button = ({ children, type }: any) => {
    const style = useMemo(() => {
        if (type === 'secondary') {
            return "my-3 mr-3 bg-none border-indigo-700 text-indigo-700 cursor-pointer hover:bg-indigo-200 transition-all rounded-md h-max px-6 py-3 uppercase font-extrabold";
        }
        if (type === 'danger') {
            return "my-3 mr-3 bg-none border-red-400 text-red-500 cursor-pointer hover:bg-red-900 transition-all rounded-md h-max px-6 py-3 uppercase font-extrabold";
        }
            else {
            return "my-3 mr-3 bg-none text-white cursor-pointer hover:bg-slate-800 transition-all rounded-md h-max px-6 py-3 uppercase font-extrabold";
        }
    }, [type]);

return(
            
            <div className={style}>
        {children}
    </div>
        


    )
}

export default Button;