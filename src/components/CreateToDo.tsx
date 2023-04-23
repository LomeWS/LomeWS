import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
  category?: string;
}

function CreateToDo () {  
  const category = useRecoilValue(categoryState)
  const [toDos, setToDos] = useRecoilState(toDoState)
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const handleValid = ({toDo}:IForm) => {
    setToDos(oldToDos => [{text: toDo, id: Date.now(), category: category}, ...oldToDos])
    setValue("toDo", "")
  }
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  return (
    <form onSubmit={handleSubmit(handleValid)}>

      <input {...register("toDo", {
        required: 'Please Write a To Do', 
      })} placeholder="Write a To Do" />
      <button>Add</button>
    </form>
  )
}

export default CreateToDo