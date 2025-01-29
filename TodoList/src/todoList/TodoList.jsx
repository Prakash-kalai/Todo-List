import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, deleteData, updateData } from '../redux/features/todoListSlice/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import "../App.css"
import { Link } from 'react-router-dom';

const TodoList = () => {
    const dispatch = useDispatch();
    const reduxData = useSelector((state) => state.TodoList?.todoList?.data || []);
    const loginName = JSON.parse(localStorage.getItem("loginUser") || "[]");
    const [name, setName] = useState('');
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

    useEffect(() => {
        if (reduxData.length > 0) {
            localStorage.setItem("todoList", JSON.stringify(reduxData));
        }
    }, [reduxData]);

    const resetForm = () => {
        setName('');
        setEdit(false);
        setEditId(null);
    };

    const submit = () => {
        if (!name.trim()) {
            setMessage('Please type something...');
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        if (edit) {            
            dispatch(updateData({id:editId,name:name}));                                    
            toast.success('Updated successfully');
        } else {
            const time = new Date();
            const formattedDate = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
            const id = reduxData.length ? reduxData[reduxData.length - 1].id + 1 : 1;
            const newItem = { id, title: name, userId: String(loginName?.[0]?.userId), date: formattedDate };
            dispatch(postData(newItem));
            toast.success('Item added');
            
        }
        resetForm();
    };

    const handleDel = (id) => {
        dispatch(deleteData(id));
        toast.info('Item deleted');
    };

    const handleEdit = (id) => {
        const itemToEdit = reduxData.find((e) => e._id === id);
        if (itemToEdit) {
            setEdit(true);
            setName(itemToEdit.title);
            setEditId(id);
        }
    };

    const clearAll = () => {
        dispatch(deleteData("all"));
        toast.warn('All items cleared');
    };

    return (
        <div className="w-full h-full bg-white">
            <div className="w-full sm:w-[90%] md:w-[50%] m-auto h-20 flex items-center justify-between px-4 text-xl font-bold font-serif">
                <div className='text-md sm:text-[30px]'>TodoList</div>
                {
                    !loginName.length ? (
                        <Link to={"/signin"} className="px-2 py-0 cursor-pointer bg-red-900 text-white rounded shadow-md">Signin</Link>
                    ) : (
                        loginName?.map((e) => (
                            <div key={e.userId} className="w-10 h-10 rounded-full bg-purple-900 text-white flex items-center justify-center cursor-pointer">
                                {e.username[0].toUpperCase()}
                            </div>
                        ))
                    )
                }
            </div>

            <div className="container px-4">
                <div className="w-full flex flex-row justify-center items-center gap-2">
                    <input
                        placeholder={message || (edit ? 'Edit Item...' : 'Enter Content...')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-60 h-10 px-3 border border-purple-400 bg-white shadow-md focus:outline-none"
                    />
                    <button
                        className="w-10 h-10 flex items-center justify-center text-lg bg-purple-500 text-white rounded shadow-md"
                        onClick={submit}
                    >
                        {edit ? '✔' : '+'}
                    </button>
                </div>

                <div className="w-full sm:w-[90%] md:w-[50%] mx-auto py-4 overflow-y-auto max-h-80 scrollbar-custom">
                    {loginName.length && reduxData.length > 0 ? (
                        reduxData.map((e) => (
                            <div key={e.id} className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 bg-gray-100 shadow-md p-2 mb-2">
                                <div className="text-xl sm:text-base font-bold w-[150px]">
                                    {e.id}. {e.title.toUpperCase()}
                                </div>
                                <div>
                                    finished
                                    <div className="text-xs text-gray-500">{e.date}</div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="text-white px-3 py-1 bg-blue-500 rounded" onClick={() => handleEdit(e._id)}>Edit</button>
                                    <button className="text-white px-3 py-1 bg-red-500 rounded" onClick={() => handleDel(e.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full grid place-items-center text-lg font-bold font-serif">No Data...</div>
                    )}
                </div>

                <div className="w-full sm:w-[90%] md:w-[50%] mx-auto flex justify-between items-center py-4">
                    <div className="text-lg font-bold">Total Items: {reduxData.length}</div>
                    <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded shadow-md"
                        onClick={clearAll}
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default TodoList;
