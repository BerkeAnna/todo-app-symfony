import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function TodoTable(){
    const context = useContext(TodoContext); //original: useContext(TodoContext)

        return(
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
                            <TextField fullWidth={true}/>
                        </TableCell>
                        <TableCell align='right'>
                            <IconButton>
                                <AddIcon></AddIcon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.map(todo => (
                        <TableRow>
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
        );
}

export default TodoTable;