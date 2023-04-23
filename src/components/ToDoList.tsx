
import React, { useState } from "react";
import { useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import { categories, categoryState, toDoSelector, toDoState } from "../atoms";
import AddCategory from "./AddCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const AddCat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  background-color: #fff;
  padding: 10px;
  color: black;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector)
  const [showAddCat, setShowAddCat] = useState(false);
  const [category, setCategory] = useRecoilState(categoryState)
  const allCategory = useRecoilValue(categories);
  const onInput = (e:React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any)
  }
  return (
    <>
      {showAddCat ? <AddCategory setShowAddCat={setShowAddCat} /> : null}
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {allCategory.map((item: string, index: number) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <CreateToDo />
      <AddCat onClick={() => setShowAddCat(true)}>
            Add more categories
          </AddCat>
      { toDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
        
     
    </>
  )
}

export default ToDoList