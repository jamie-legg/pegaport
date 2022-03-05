interface IHeadingProps {
    style?: string
    title?: string
    children: any
}


const Heading = ({ children, style, title }: IHeadingProps) => {
    if(style){
        return(
        <>
        <h2 className="my-1.5 flex mr-9 font-bold text-xl lg:text-2xl 2xl:text-3xl uppercase">
            {title}
        <div className="border-t-white border-t-2 mt-3 ml-3 w-max"></div>
        
        </h2>
        <div className="flex">
        {children}
        </div>
        </>
        )
    }
    else {
        return <h2 className="my-1.5 mr-9 font-bold text-2xl lg:text-4xl 2xl:text-6xl uppercase">{children}</h2>
    }
}

export default Heading;