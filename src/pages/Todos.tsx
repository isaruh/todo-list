import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { deleteTodoRequest, fetchTodosRequest, updateTodoRequest } from "../store/slices/todosSlice";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import type { TodosQuery } from "../types/todo.types";
import { ThreeDot } from "react-loading-indicators";
import { MdArrowDropDown } from "react-icons/md";
import ModalForm from "../components/ModalForm";
import Swal from "sweetalert2";

export default function Todos() {
    const dispatch = useDispatch();
    const { loading, items } = useSelector((state: RootState) => state.todos);
    const [meta, setMeta] = useState<TodosQuery>({
        skip: 0,
        limit: 20
    })
    const [showForm, setShowForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        dispatch(fetchTodosRequest(meta));
    }, [dispatch, meta]);

    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showForm]);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteTodoRequest(id));
                    Swal.fire("Deleted!", "Your todo has been deleted.", "success");
                }
        });
    }

    const handleCheck = (id: number) => {
        const todo = items.todos.find(t => t.id == id);
        if (!todo) return;
        dispatch(updateTodoRequest(
            {...todo, completed: !todo.completed}
        ))
    }

    return (
        <>
            {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-10 blur-sm z-40"></div>
            )}

            <div className={`z-0 flex flex-col gap-10 ${showForm && "blur-sm"}`}>
                <div className="grid grid-cols-6 gap-10">
                    <div className="col-span-4 flex flex-col justify-center bg-white px-10 py-10 shadow-xl rounded-3xl">
                        <span className="text-2xl text-[#333] font-bold">Welcome, John Doe!</span>
                        <span className="text-[#999] font-semibold">manage your schedule</span>
                    </div>
                    <div className="col-span-2 flex flex-col justify-center bg-white px-10 py-10 shadow-xl rounded-3xl">
                        <span className="text-[#999] font-semibold">Total To-Do's</span>
                        <span className="text-4xl text-[#333] font-extrabold">
                            {loading ? (
                                <ThreeDot color="#333" size="medium" text="" textColor="" />
                            ) : items.total}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-10">
                    <div className="col-span-4 flex gap-5 justify-between p-5 bg-white rounded-full shadow-xl">
                        <input type="text" placeholder="search" className="border-2 px-4 py-3 w-full rounded-full" />
                        <button className="text-white bg-[#333] p-5 rounded-full hover:bg-[#777] transition-all duration-300">
                            <FaSearch />
                        </button>
                    </div>

                    <div className="grid grid-rows-2 gap-2">
                        <button onClick={() => setShowForm(true)} className="text-white bg-[#333] rounded-full hover:bg-[#777] transition-all duration-300">
                            new +
                        </button>
                        <div className="relative w-full h-full">
                            <button onClick={() => setShowFilter(!showFilter)} className="flex justify-center items-center w-full h-full text-white bg-[#333] rounded-full hover:bg-[#777] transition-all duration-300">
                                filter <MdArrowDropDown />
                            </button>
                            <div className={`absolute w-[175px] bg-white shadow-lg p-2 mt-2 rounded-xl ${!showFilter && "hidden"}`}>
                                <ul>
                                    <li><button className="px-3 py-2 w-full text-left rounded-lg hover:bg-[#f1f1f1]">uncompleted</button></li>
                                    <li><button className="px-3 py-2 w-full text-left rounded-lg hover:bg-[#f1f1f1]">completed</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-5 bg-white rounded-[60px] shadow-xl">
                    {loading && (
                        <ThreeDot color="#333" size="medium" text="" textColor="" />
                    )}
                    {items.todos.map((t) => (
                        <div key={t.id} className="flex justify-between items-center bg-[#f0f0f0] px-5 py-5 rounded-full">
                            <div className="flex gap-4">
                                <input type="checkbox" checked={t.completed} onChange={() => handleCheck(t.id)} />
                                <span className="font-semibold text-xl">{t.todo}</span>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(t.id)} className="px-4 py-4 text-white bg-red-500 rounded-full hover:bg-red-700 transition-all duration-300">
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between gap-5 p-5 font-semibold text-[#333] bg-white shadow-xl rounded-full">
                        <button disabled={items.skip == 0} onClick={() => setMeta({...meta, skip: items.skip-20})} className={`text-semibold ${items.skip == 0 && "text-[#999]"}`}>
                            &lt; prev
                        </button>
                        <span>page {(items.skip/20) + 1}</span>
                        <button disabled={(items.total - items.skip) <= 20} onClick={() => setMeta({...meta, skip: items.skip + items.limit})} className={`text-semibold ${(items.total - items.skip) <= 20 && "text-[#999]"}`}>
                            next &gt;
                        </button>
                </div>
            </div>

            <ModalForm show={showForm} setShow={setShowForm} />
        </>
    );
}