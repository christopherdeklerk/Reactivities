export interface Guitar {
    Type: string,
    Age: number,
    makeSong: (song: string) => void;    
}

let Epiphone : Guitar = { 
    Type: "Electric", 
    Age: 7, 
    makeSong: (song: string) => console.log(song) 
};

let Saehan : Guitar = { 
    Type: "Acoustic", 
    Age: 20, 
    makeSong: (song: string) => console.log(song) 
};

export const Guitars = [Epiphone, Saehan];