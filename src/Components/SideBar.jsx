import React, { useState } from "react";
import { Box, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
const SideBar = () => {
  const [open, setOpen] = useState(false);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>setOpen(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
              <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Open SideBar</Button>
      <Drawer open={open} onClose={() => setOpen(!open)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideBar;
