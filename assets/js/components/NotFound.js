import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4" color="error">
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} component={Link} to="/todo-list">
                Go to Todo List
            </Button>
        </Box>
    );
};

export default NotFound;
