import Button from "~/components/button";
import Heading from "~/components/heading";
import Nav from "~/components/nav";

const Family = () => {
    return (
        <div className="bg-gradient-to-r text-white from-slate-900 to-fuchsia-900 h-screen w-full">
            <Nav />
            <div className="py-20 mx-20 rounded-md">
                <div className="flex">
                    <Heading >
                        Family Tree
                    </Heading>
                    <Button>Load Family</Button>
                </div>
            </div>

        </div>
    )
}


export default Family;