import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodoRequest } from "../store/slices/todosSlice";

export default function ModalForm({ show, setShow }: { show: boolean, setShow: (show: boolean) => void }) {
    const [todoForm, setTodoForm] = useState<string>("");
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (todoForm != "") {
            setShow(false);
            dispatch(createTodoRequest({todo: todoForm, completed: false, userId: 1}));
            setTodoForm("");
        }
    }

    const handleCancel = () => {
        setShow(false);
        setTodoForm("");
    }

    return (
        <form>
            <div className={`fixed flex flex-col items-start justify-center items-center inset-0 w-full h-screen z-50 bg-transparent ${!show && "hidden"}`}>
                <div className="flex gap-10 bg-white shadow-xl p-5 rounded-full">
                    <input type="text" placeholder="title" value={todoForm} onChange={(e) => setTodoForm(e.target.value)} className="px-5 py-3 border-2 rounded-full" />
                    <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={handleSubmit} className="p-5 text-white bg-[#333] rounded-full hover:bg-[#777] transition-all duration-300">
                            done
                        </button>
                        <button onClick={handleCancel} className="p-5 text-[#333] bg-white rounded-full border-2 hover:bg-[#f0f0f0] transition-all duration-300">
                            cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}