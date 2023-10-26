// import React, {useEffect, useState} from "react";
// // mui
// import {Box, Stack, Container, Typography, Button, ListItemIcon, IconButton} from "@mui/material"
// import { CloseIcon, InputSelectIcon, TreeViewExpandIcon } from "@theme/overrides/CustomIcons";

// const Navbar = ()=>{

//     const [navbar,setNavbar] = useState(false)
//     const [left,setLeft] = useState(-295)

//     const navbarButton = ()=>{
//         setNavbar(!navbar);
//     }

//     useEffect(()=>{
//       if(navbar) setLeft(0)
//       else setLeft(-295)
//     },[navbar])


//     return <>
//     <Box sx={{height:"100vh",width:"300px",position:"fixed",left:`${left}`,top:"0",backgroundColor:"red"}}>
//         <Button sx={{left:"300px",top:"30px"}} onClick={navbarButton}>
//           <IconButton>
//             <InputSelectIcon/>
//           </IconButton> 
//         </Button>
//         <Stack>

//         </Stack>
//     </Box>
//     </>

// }

// export default Navbar
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CloseIcon, TreeViewCollapseIcon } from '@theme/overrides/CustomIcons';
//import InboxIcon from '@mui/icons-material/MoveToInbox';  ne radi import, crashuje
//import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const redirect = (index)=>{
    const links = ["http://localhost:3000/shortener","http://localhost:3000/shortener/list"]
    window.location.replace(`${links[index]}`);
  }

  const deleteData = ()=>{
    alert("Data deleted from local storage")
    window.localStorage.removeItem("data");
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Generator', 'List'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>{redirect(index)}}>
              <ListItemIcon>
                <TreeViewCollapseIcon/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Delete Data'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={deleteData}>
              <ListItemIcon>
                <CloseIcon/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}