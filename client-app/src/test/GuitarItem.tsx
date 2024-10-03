import { Guitar } from "./test"

interface Props {
    guitar: Guitar,
    random: string
}

// destructure the props
export default function GuitarItem({guitar, random}: Props) {
    return (
        <div>            
            <span>{random}</span>
            <button onClick={() => guitar.makeSong(guitar.Age + "Johnson")}>
                Make Song
            </button>
        </div>        
    )
}

/*

Called from App.tsx like this:

<div>
    {Guitars.map(guitar =>         
            <GuitarItem key={guitar.Age} 
                guitar={guitar} 
                random={guitar.Type} />
    )}
</div>            

*/