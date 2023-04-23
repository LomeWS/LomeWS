import { atom, selector } from "recoil";


export const categories = atom({
  key: "categories",
  default: localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories") as any)
    : ["TO_DO", "DOING", "DONE"],
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}



export const categoryState = atom<string>({
  key:"categoryState",
  default: localStorage.getItem("categoryState")
    ? JSON.parse(localStorage.getItem("categoryState") as any)
    : "TO_DO",
})

export const toDoState = atom<IToDo[] >({
  key: "toDo",
  default: localStorage.getItem("toDos")
    ? JSON.parse(localStorage.getItem("toDos") as any)
    : [],
})

export const toDoSelector = selector({
  key : "toDoSelector",
  get : ({get}) => {
    const toDos = get(toDoState)
    const category = get(categoryState)

    return toDos.filter(toDo => toDo.category === category)
  
  }
})