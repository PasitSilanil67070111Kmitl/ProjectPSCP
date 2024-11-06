import { House , Menu , CircleUserRound } from "lucide-react"

export function Navbar(props){
    return(
        <div className="bg-blue-500 text-white flex justify-between p-4">
            <div className="flex gap-2">
                <a href={"/"}><House /></a>
                <Menu />
            </div>
            <a className="flex gap-2">
                {props.name}
                <CircleUserRound />
            </a>
        </div>
    )
}