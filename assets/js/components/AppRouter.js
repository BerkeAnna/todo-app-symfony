import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoContextProvider from "../contexts/TodoContext";
import TodoTable from "./TodoTable";
import AppSnackbar from "./AppSnackbar";
import Navigation from "./Navigation";
import NotFound from "./NotFound";
import { styled } from "@mui/material/styles";

const StyledDivider = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const AppRouter = () => {
    return (
        <Router>
            <Navigation />
            <StyledDivider />
            <TodoContextProvider>
                <Routes>
                    {/* Ha a "/" vagy "/todo-list", akkor a TodoTable-t mutatja */}
                    <Route path="/" element={<TodoTable />} />
                    {/* Minden más esetben a NotFound oldalt jeleníti meg */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <AppSnackbar />
            </TodoContextProvider>
        </Router>
    );
};

export default AppRouter;
