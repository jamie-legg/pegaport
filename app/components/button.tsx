import { useMemo } from "react";

interface IButtonProps {
    children: React.ReactNode;
    type?: "secondary" | "danger";
    onClick?: () => void;
}

const Button = ({ children, type, onClick }: IButtonProps) => {
    let baseClass = 'inline-flex mx-3 items-center justify-center px-4 py-2 nm-convex-slate-900 rounded-md transition-all font-extrabold';
    const style = useMemo(() => {
        if (type === 'secondary') {
            return "text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        }
        if (type === 'danger') {
            return "text-red-500 hover:text-red-900";
        }
            else {
            return "my-3 mr-3 nm-convex-slate-900 text-sky-500 hover:text-sky-900 transition-all rounded-md h-max px-6 py-3 uppercase font-extrabold";
        }
    }, [type]);

return(
            
            <button onClick={onClick} className={baseClass + " " + style}>
        {children}
    </button>
        


    )
}

export default Button;