import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import DeleteDialog from '../components/DeleteDialog';
import { IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';



const StyledTableHead = styled(TableHead)({
    backgroundColor: '#250073',
});


function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodoName, setAddTodoName] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodoName, setEditTodoName] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);


    const onCreateSubmit = (event) => {
        event.preventDefault();
    
        if (!addTodoName.trim() || !addTodoDescription.trim()) {
            context.setMessage({
                text: ["Task name and description cannot be empty!"],
                level: "error"
            });
            return;
        }
    
        context.createTodo(event, { name: addTodoName, description: addTodoDescription });
        setAddTodoName('');
        setAddTodoDescription('');
    };
    

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
    
        if (!editTodoName.trim() || !editTodoDescription.trim()) {
            context.setMessage({
                text: ["Task name and description cannot be empty!"],
                level: "error"
            });
            return;
        }
    
        if (editTodoName === context.todos.find(t => t.id === todoId).name && 
            editTodoDescription === context.todos.find(t => t.id === todoId).description) {
            context.setMessage({
                text: ["There was no change to the To-Do. Neither the name nor the description was changed."],
                level: "error"
            });
            return;
        }
    
        context.updateTodo({ id: todoId, name: editTodoName, description: editTodoDescription });
    
        setEditIsShown(false);
    };
    
    

    return (
        <Fragment>
            <form onSubmit={(event) => {
                context.createTodo(event, { id: new Date().getTime(), name: addTodo });
                setAddTodo(''); // Mező kiürítése
            }}>
                <Table>
                    {/*HEAD*/}
                    <StyledTableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </StyledTableHead>
                    {/*BODY*/}
                    <TableBody>
                        {/*ADD*/}
                        <TableRow>
                            <TableCell>
                                <form onSubmit={onCreateSubmit}>
                                    <TextField type="text" value={addTodoName} onChange={(event) => setAddTodoName(event.target.value)} label="New Task" fullWidth={true}/>
                                </form>
                            </TableCell>

                            <TableCell>
                                <form>
                                    <TextField type="text" value={addTodoDescription} onChange={(event) => setAddTodoDescription(event.target.value)} label="Description" fullWidth={true} multiline={true}/>
                                </form>
                            </TableCell>

                            <TableCell align='right'>
                                <IconButton onClick={onCreateSubmit}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {/*DATA*/}
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo' + index}>
                                <TableCell>
                                    {editIsShown === todo.id ? 
                                        <form onSubmit={(event) => onEditSubmit(todo.id, event)}>
                                            <TextField 
                                                type="text"
                                                fullWidth={true} 
                                                autoFocus={true}
                                                value={editTodoName} 
                                                onChange={(event) => setEditTodoName(event.target.value)} 
                                            
                                            />
                                        </form>
                                        :
                                        <Typography>{todo.name}</Typography>
                                    }
                                </TableCell>

                                {/*DESCRIPTION*/}
                                <TableCell>
                                    {editIsShown === todo.id ? 
                                        <TextField 
                                            type="text"
                                            fullWidth={true} 
                                            autoFocus={true}
                                            value={editTodoDescription} 
                                            onChange={(event) => setEditTodoDescription(event.target.value)} 
                                            multiline={true}
                                        />
                                        :
                                        <Typography style={{whiteSpace: "pre-wrap"}}>{todo.description}</Typography>
                                    }
                                </TableCell>

                                <TableCell align='right'>
                                    {editIsShown === todo.id ? 
                                    <Fragment>
                                        <IconButton onClick={(event) => onEditSubmit(todo.id, event)}>
                                            <DoneIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => setEditIsShown(false)}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Fragment>
                                                            :
                                    <Fragment>
                                    <IconButton color="primary" onClick={() => { setEditIsShown(todo.id); setEditTodoName(todo.name); setEditTodoDescription(todo.description) }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() =>{setDeleteConfirmationIsShown(true); 
                                        setTodoToBeDeleted(todo)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                    </Fragment>
                                    }
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