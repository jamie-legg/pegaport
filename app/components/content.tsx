import { useTransition } from "remix";

interface IContentProps {
    children: React.ReactNode
}

const Content = ({ children }: IContentProps) => {
    const transition = useTransition();
    const busy = transition.submission;

    return (
        <div className="bg-gradient-to-r text-white from-slate-900 to-fuchsia-900 h-screen w-full">
            {children}
        </div>
    )
}