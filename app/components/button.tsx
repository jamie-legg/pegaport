import { useMemo } from "react";

const Button = ({ children, type }: any) => {
    const style = useMemo(() => {
        if (type === 'secondary') {
            return "my-3 mr-3 nm-concave-slate-900 border-fuchsia-700 text-slate-100 hover:text-slate-400 cursor-pointer transition-all rounded-md h-max px-6 py-3 uppercase font-extrabold";
        }
        if (type === 'danger') {
            return "my-3 mr-3 nm-convex-slate-900 text-red-500 cursor-pointer hover:text-red-900 transition-all rounded-md h-max px-6 py-3 uppercase font-extrabold";
        }
            else {
            return "my-3 mr-3 bg-none text-white transition-all rounded-md h-max px-6 py-3 uppercase font-extrabold";
        }
    }, [type]);

return(
            
            <div className={style}>
        {children}
    </div>
        


    )
}

export default Button;