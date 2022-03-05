import { useMemo } from "react";

export const Score = ({ score }: any) => {
    //score should be 1-5 regardless of dimensionality
    let quantity = Math.ceil(score/100) || 1;

    const color = useMemo(() => {
        const colors = [
            {
                color: "bg-red-500",
                min: 1,
                max: 2
            },
            {
                color: "bg-orange-500",
                min: 2,
                max: 3
            },
            {
                color: "bg-yellow-500",
                min: 3,
                max: 4
            },
            {
                color: "bg-green-500",
                min: 4,
                max: 5
            }
        ];
        const color = colors.find(c => quantity >= c.min && quantity <= c.max);
        return color ? color.color : "bg-gray-500";
    }, [quantity]);

    return(
        <div className="flex h-full w-36">
            {[...Array(quantity)].map((_, i) => (
                <div key={i} className={`${color} w-4 h-4 mr-1 rounded-sm`}></div>
            ))}
        </div>
    )
}