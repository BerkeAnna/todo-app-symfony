import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');

    return (
        <form onSubmit={(event) => {
            context.createTodo(event, { id: new Date().getTime(), name: addTodo });
            setAddTodo(''); // Mező kiürítése
        }}>
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
                            <TextField value={addTodo} onChange={(event) => setAddTodo(event.target.value)} label="New Task" fullWidth={true}/>
                        </TableCell>
                        <TableCell align='right'>
                            <IconButton type="submit">
                                <AddIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>
                            <TableCell>
                                {editIsShown === todo.id ? 
                                    <TextField 
                                        fullWidth={true} 
                                        value={editTodo} 
                                        onChange={(event) => setEditTodo(event.target.value)} 
                                        InputProps= {{
                                            endAdornment: <Fragment>
                                                            <IconButton><DoneIcon 
                                                                        onClick={()=> {
                                                                            context.updateTodo({id: todo.id, name: editTodo}); 
                                                                            setEditIsShown(false); 
                                                                        }}>
                                                            </DoneIcon></IconButton>
                                                            <IconButton 
                                                                        onClick={() => {
                                                                            setEditIsShown(false); 
                                                                            setEditTodo('')
                                                                        }}>
                                                            <CloseIcon></CloseIcon></IconButton>
                                                        </Fragment>
                                        }}
                                        
                                        />
                                    :
                                    todo.name
                                }
                            </TableCell>
                            <TableCell align='right'>
                                <IconButton onClick={() => { setEditIsShown(todo.id); setEditTodo(todo.name); }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon />
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