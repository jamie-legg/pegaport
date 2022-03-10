import Typist from "react-typist";
import Button from "~/components/button";
import Heading from "~/components/heading";
import Nav from "~/components/nav";

const Security = () => {
    return (
        <Layout>
            <NavBar />
            <div className="py-10 mx-20 rounded-md min-h-screen">
                <div className="flex">
                    <Heading><Typist>
                        <Typist.Delay ms={1000} />
                        1. OPEN SOURCE
                        </Typist></Heading>

                </div>
                <div className="mt-3">
                    <div className="mt-3">Your personal information is encrypted and protected by open source security standards.</div>
                    <div className="mt-3">The source code is available to view at all times on GitHub.</div>
                    <Button><a href="https://github.com/jamie-legg/pegaport">VIEW SOURCE</a></Button>
                </div>

                <div className="mt-12">
                    <Heading>
                        <Typist>
                        <Typist.Delay ms={4000} />
                        2. FREE TO USE
                        </Typist></Heading>

                    <div className="mt-3">You will never be charged to use Pegaport, nor will we ever run ads.</div>
                    <div className="mt-3">You can support the project by becoming a priveleged member and gaining additional features.</div>
                    <Button>SUPPORT PEGAPORT</Button>
                </div>

            </div>

        </div>
    )
}

export default Security;