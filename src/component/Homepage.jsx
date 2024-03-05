import React, { useEffect, useState } from 'react'
import { TfiTrash } from "react-icons/tfi";

export default function Homepage() {
    const [addData, SetaddData] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        try {
            let dataLocal = JSON.parse(localStorage.getItem('data')) || []
            setData(dataLocal)
        } catch (error) {}
    }, [])

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);
    
    const handleChange = (e) => {
        SetaddData(e.target.value)
    }

    const addTask = () => {
        let newData = [...data]
        let findData=newData.findIndex((task)=>{
            return addData==task.taskName
        })
        if (addData.trim().length < 1) {
            alert('ghi task')
        } else {
            if(findData<0){
                newData.push({
                    id: Math.floor(Math.random() * 100),
                    taskName: addData,
                    status: false
                })
                setData(newData)
                SetaddData('')
            }else{
                alert('trùng task')
                SetaddData('')
            } 
        }
    }

    

    const activeTask = (event, id) => {
        let newData = [...data]
        let findIndex = newData.findIndex((task) => {
            return id == task.id
        })
        newData[findIndex].status = event.target.checked
        setData(newData)
    }

    const deleteTask = (id) => {
        let newTask = [...data]
        let findTask = newTask.findIndex((task) => {
            return task.id == id
        })
        newTask.splice(findTask,1)
        setData(newTask)
    }

    const renderTask = (type) => {
        return data.map((task) => {
            let classCheck = 'normal'
            let iconDelete = ''
            if (type == 'all' || (type == 'active' && !task.status) || (type == 'complete' && task.status)) {
                if (task.status == true) {
                    classCheck = 'active-task'
                }
                if (type == 'complete') {
                    iconDelete = <TfiTrash />
                }
                return (
                    <div className='task-content' key={task.id}>
                        <div className="task-left">
                            <input type="checkbox" checked={task.status} onChange={() => { activeTask(event, task.id) }} />
                            <p className={classCheck}>{task.taskName}</p>
                        </div>
                        <div className="task-right" onClick={() => { deleteTask(task.id) }}>
                            <p className='delete-section'>{iconDelete}</p>
                        </div>
                    </div>
                )
            }
        })
    }


    return (
        <div className='todo-body'>
            <h1>#todo</h1>
            <div className="todo-list">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Active</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Complete</button>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="add-section">
                            <input type="text" onChange={handleChange} value={addData} />
                            <button className="add-todo" onClick={addTask}>Add</button>
                        </div>
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>{renderTask('all')}</div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>{renderTask('active')}</div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>{renderTask('complete')}</div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
