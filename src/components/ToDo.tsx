import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"
import { categories, IToDo, toDoState } from "../atoms"


const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  background-color: #ff5975;
`
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

`
const Btn = styled.button`
  margin: 0 10px;

`
function ToDo({text, category, id}:IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const allCategory = useRecoilValue(categories);
  const onClick = (clickedCategory: string) => {
    const targetIndex = toDos.findIndex((item) => item.id === id);
    const newToDo: IToDo = { text, id, category: clickedCategory };
    setToDos(() => [
      ...toDos.slice(0, targetIndex),
      newToDo,
      ...toDos.slice(targetIndex + 1),
    ]);
  };

  return (
    <List>
      <span>{text}</span>
      <BtnWrap>
      {allCategory.map(
        (item: string, index: number) =>
          category !== item && (
            <button key={index} onClick={() => onClick(item)}>
              {item}
            </button>
          )
      )}

      </BtnWrap>
    </List>
  )
}

export default ToDo