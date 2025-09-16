import React, { createContext, useState, ReactNode} from 'react';
import { v4 as uuidv4 } from 'uuid';

//Definição do tipo para os itens da lista
interface ListItem{
    id: string;
    name: string;
    link: string;
    lyric?: string;
}

//Definição do tipo para o contexto
interface GlobalListContextType{
    musicList: ListItem[];
    addItem: (item: Omit<ListItem, 'id'>) => void;
    removeItem: (id: string) => void;
    moveItem: (index: number, direction : number) => void;
}

//criação do contexto com o tipo definido
export const GlobalListContext = createContext<GlobalListContextType | undefined>(undefined);

//provedor do contexto
interface GlobalListProviderPros{
    children: ReactNode;
}

export const GlobalListProvider: React.FC<GlobalListProviderPros> = ({children}) => {

    const [musicList, setMusicList] = useState<ListItem[]>([]);
    const [lastId, setLastId] = useState<number>(musicList.length);

    const addItem = (item: Omit<ListItem, 'id'>) => {
        const newId = (lastId + 1).toString();
        const newItem: ListItem = {
          id: uuidv4(),
          name: item.name,
          link: item.link ?? "", // Ensures link is always a string
          lyric: item.lyric,
        };
        setMusicList((prevList : ListItem[]) => [...prevList, newItem]);
        setLastId(lastId + 1);
    };

    const removeItem = (id: string) =>{
        setMusicList(prevList => prevList.filter((item : ListItem) => item.id !== id));
    };

    const moveItem = (index : number, direction: number) => {
        const newMusicList = [...musicList];
        const targetIndex = index + direction;

        //verifica se movimentação está dentro dos limites
        if(targetIndex >= 0 && targetIndex < musicList.length){
            const temp = newMusicList[index];
            newMusicList[index] = newMusicList[targetIndex];
            newMusicList[targetIndex] = temp;
            setMusicList(newMusicList);
        }
    };

    return (
        <GlobalListContext.Provider value={{musicList, addItem, removeItem, moveItem}}>
            {children}
        </GlobalListContext.Provider>
    );
};

