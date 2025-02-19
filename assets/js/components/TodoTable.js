import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import DeleteDialog from '../components/DeleteDialog';
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
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {name: addTodo});
        setAddTodo('');
    };

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
    
        if (!editTodo.trim()) {
            alert("Task name cannot be empty!");
            return;
        }
    
        context.updateTodo({ id: todoId, name: editTodo });
    
        setEditIsShown(false);
        setEditTodo('');
    };
    

    return (
        <Fragment>
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
                                <form onSubmit={onCreateSubmit}>
                                    <TextField type="text" value={addTodo} onChange={(event) => setAddTodo(event.target.value)} label="New Task" fullWidth={true}/>
                                </form>
                            </TableCell>
                            <TableCell align='right'>
                                <IconButton onClick={onCreateSubmit}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo' + index}>
                                <TableCell>
                                    {editIsShown === todo.id ? 
                                        <form onSubmit={(event) => onEditSubmit(todo.id, event)}>
                                            <TextField 
                                                type="text"
                                                fullWidth={true} 
                                                autoFocus={true}
                                                value={editTodo} 
                                                onChange={(event) => setEditTodo(event.target.value)} 
                                                InputProps= {{
                                                    endAdornment: <Fragment>
                                                                  <IconButton onClick={(event) => onEditSubmit(todo.id, event)}>
                                                                    <DoneIcon />
                                                                  </IconButton>

                                                                    <IconButton 
                                                                                onClick={() => {
                                                                                    setEditIsShown(false); 
                                                                                }}>
                                                                    <CloseIcon></CloseIcon></IconButton>
                                                                </Fragment>
                                                }}
                                                
                                            />
                                        </form>
                                        :
                                        todo.name
                                    }
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={() => { setEditIsShown(todo.id); setEditTodo(todo.name); }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() =>{setDeleteConfirmationIsShown(true); 
                                        setTodoToBeDeleted(todo)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>

            {deleteConfirmationIsShown && (
                <DeleteDialog   todo={todoToBeDeleted} 
                                open={deleteConfirmationIsShown} 
                                setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}
            
        </Fragment>
    );
}


export default TodoTable;