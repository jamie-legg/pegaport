import { useState } from "react";

const Connect = () => {
    const [message, setMessage] = useState('');
    return (
        <div>
            {message}
        </div>
    )
}