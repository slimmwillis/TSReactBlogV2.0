import { useContext, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import "./navMenu.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import AddPostDialog from "./AddPostDialog";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function PostListTemplate() {
  const initialList: any = [];
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState(initialList);
  const [posts, setPosts] = useState(initialList);

  const { admin } = useContext(AuthContext) as AuthContextType;

  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);

  const handleClickOpenPost = () => {
    
navigateToManagePost();

    // setOpenAddPostDialog(true);
  };

  const navigateToManagePost = () => {
    // Your custom navigation logic here
    // For example, you can use window.location.href or any other method to navigate
    window.location.href = "/manage";
  };

  const handleClosePost = () => {
    setOpenAddPostDialog(false);
  };

  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleDrawerClose = () => {
  //     setOpen(false);
  //   };

  const handleDrawerToggle = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    // setOpen((prevOpen) => !prevOpen);
  };

  function addPost(post: string) {
    setPosts([...posts, posts]);
  }

  const handleDeleteItem = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  

  return (
    <>
      {/* ************POST TEMPLATE******** */}

      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer variant="permanent" open={open}>
          <Divider />
          <List>
            {posts.map((text: any, index: any) => (
              <ListItem
                key={index}
                onClick={() => navigate(`/posts/${text}`)}
                disablePadding
                sx={{
                  display: "block",
                  bgcolor:
                    location.pathname === `/posts/${encodeURIComponent(text)}`
                      ? "rgb(245, 245, 245)"
                      : "white",
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 12,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {/* {index % 2 === 0 ? <div></div> : <div></div>} */}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    style={{
                      opacity: open ? 1 : 0.95,
                      fontSize: open ? "1rem" : "0.5rem",
                      color: open ? "black" : "black",
                    }}
                  />
                </ListItemButton>

                {/* delete list item */}

                {admin && (
                  <Button onClick={() => handleDeleteItem(index)}>
                    {open ? (
                      <div id="delete"> Delete</div>
                    ) : (
                      <div id="x">x</div>
                    )}
                  </Button>



                )}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              onClick={handleClickOpenPost}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  +
                </ListItemIcon>
                <ListItemText
                  primary={"Add post"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <AddPostDialog
          addPost={addPost}
          open={openAddPostDialog}
          handleClose={handleClosePost}
        />
      </Box>
    </>
  );
}

//title - parent category

// subCategory section(
// title
// add , delete, edit)

//post section(
// title: snippet
// add, delete, edit)

// category/post
//category/sub/sub/post