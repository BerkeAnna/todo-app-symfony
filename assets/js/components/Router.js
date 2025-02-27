import React from "react";
import TodoContextProvider from "../contexts/TodoContext";
import TodoTable from "./TodoTable";
import AppSnackbar from "./AppSnackbar";
import Navigations from "./Navigation";
import { styled } from "@mui/material/styles";


const StyledDivider = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
}));


const Router = () => {
    return(
        <div>
            <Navigations/>
            <StyledDivider />
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackbar/>
            </TodoContextProvider>
        </div>
    );
};

export default Router;