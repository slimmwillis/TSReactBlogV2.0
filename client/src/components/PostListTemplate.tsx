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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import AddPostDialog from "./ArchiveAddPostDialog";

const drawerWidth = "100%";

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
  const params = useParams();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState(initialList);
  const [posts, setPosts] = useState(initialList);
  console.log("location", params)
  const { admin } = useContext(AuthContext) as AuthContextType;

  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);

  const handleClickOpenPost = () => {
    navigateToManagePost();

    // setOpenAddPostDialog(true);
  };

  const navigateToManagePost = () => {
    // Your custom navigation logic here
    // For example, you can use window.location.href or any other method to navigate
    navigate(`/manage/${params?.categoryName}/${params?.subCategoryName}`);
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

        <Button
          onClick={handleClickOpenPost}
          variant="contained"
          sx={{ my: 3 }}
        >
          Add Post
        </Button>

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
