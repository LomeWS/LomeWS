import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categories, categoryState } from "../atoms";

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const Box = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 500px;
  height: 300px;
  background-color: #fff;
  border-radius: 20px;
  z-index: 200;
  h2 {
    font-size: 22px;
    font-weight: bold;
  }
  .close-btn {
    padding: 4px 12px;
    background-color: #fff;
    border: solid 2px #ccc;
    border-radius: 8px;
    color: #555;
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 12px;
  input {
    width: 300px;
    padding: 12px 20px;
    border-radius: 12px;
    border: none;
    outline: none;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3));
  }
  button {
    padding: 0 12px;
    background-color: crimson;
    color: #fff;
    border: none;
    border-radius: 8px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;

interface iAddCategory {
  setShowAddCat: Function;
}

interface iForm {
  addCat: string;
}

function AddCategory({ setShowAddCat }: iAddCategory) {
  const { register, handleSubmit } = useForm<iForm>();
  const [allCategory, setAllCategory] = useRecoilState(categories);
  const setCategory = useSetRecoilState(categoryState);
  const onValid = ({ addCat }: iForm) => {
    setShowAddCat(false);
    setAllCategory(() => [...allCategory, addCat]);
    localStorage.setItem("categories", JSON.stringify([...allCategory, addCat]));
    setCategory(addCat);
    localStorage.setItem("categoryNow", JSON.stringify(addCat));
  };

  return (
    <Container>
      <Box>
        <h2>추가</h2>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("addCat", {
              required: "사용자 지정 카테고리를 입력하세요",
            })}
            placeholder="Write custom category"
            autoFocus
            autoComplete="off"
            type="text"
          />
          <button type="submit">Add</button>
        </Form>
        <button
          type="button"
          className="close-btn"
          onClick={() => setShowAddCat(false)}
        >
          Close
        </button>
      </Box>
      <Overlay />
    </Container>
  );
}

export default AddCategory;
