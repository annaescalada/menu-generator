import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Task = ({ task, index }) => <Draggable
    draggableId={task.id}
    index={index}
>
    {(provided) => <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >{task.content}</div>}
</Draggable>

export default Task