import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function TodoTable(){
    const context = useContext(TodoContext); //original: useContext(TodoContext)
    const [addTodo, setAddTodo] = useState('');


        return(
            <form onSubmit={(event) => {context.createTodo(event, {name: addTodo})}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField valus={addTodo} onChange={(event)=> {setAddTodo(event.target.value)}} label="New Task" fullWidth={true}/>
                            </TableCell>
                            <TableCell align='right'>
                                <IconButton type="submit">
                                    <AddIcon></AddIcon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo' + index}>
                                <TableCell>
                                    {todo.name}
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
        );
}

export default TodoTable;