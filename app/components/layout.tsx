import { useTransition } from "remix";

interface IContentProps {
    children: React.ReactNode
}

const Layout = ({ children }: IContentProps) => {
    return (
            
    <div className="nm-concave-slate-800 text-white h-full w-full xl:overflow-clip">
        {children}
    </div>
    )
}

export default Layout;