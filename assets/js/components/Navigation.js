import React, { useState } from "react";

import { AppBar, Toolbar, IconButton, Link, Box, Button, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Menu as MenuIcon, List as ListIcon, Label as LabelIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';



const StyledAppBar = styled(AppBar)({
    backgroundColor: "#250073"
});

const MenuIconButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
  }));

const StyledList = styled(List)(({ theme }) => ({
    width: '200px'
}));


const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const drawerItems = [
        {text: 'TodoList', icon: <ListIcon/> },
        {text: 'Tags', icon: <LabelIcon/> }
    ];

    return(
        <StyledAppBar position="fixed">
            <Toolbar>
                <MenuIconButton onClick={toggleDrawer} edge="start"><MenuIcon/></MenuIconButton>
                <Link href="/" variant="h6" color="textPrimary" underline="none">TodoApp</Link>
                <Box flexGrow={1}/>
                <Button size="large">Login</Button>
            </Toolbar>
            <Drawer anchor="left" variant="temporary" onClose={toggleDrawer} open={drawerOpen}>
                <StyledList>
                    {drawerItems.map(prop => (
                        <ListItem onClick={toggleDrawer} button key={prop.text}> 
                            <ListItemIcon>{prop.icon}</ListItemIcon>
                            <ListItemText>{prop.text}</ListItemText>
                        </ListItem>
                    ))}
                </StyledList>
            </Drawer>
        </StyledAppBar>
    );
};

export default Navigation;