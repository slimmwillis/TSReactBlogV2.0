import { useContext, useEffect, useState } from "react";
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
import AddCategoryDialog from "./AddCategoryDialog";
import Button from "@mui/material/Button";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import AddPostDialog from "./ArchiveAddPostDialog";
import { PostListTemplate } from "./PostListTemplate";
import AddSubCategoryDialog from "./AddSubCategoryDialog";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    "& .MuiDrawer-paper": { ...openedMixin(theme) },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function SubCategories() {
  const initialList: any = [];
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [subCategories, setSubCategories] = useState(initialList);
  const [posts, setPosts] = useState(initialList);

  const { admin } = useContext(AuthContext) as AuthContextType;

  const [openAddSubCategoryDialog, setOpenAddSubCategoryDialog] =
    useState(false);

  const [category, setCategory] = useState<any>(null);

  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
  const params = useParams();

  console.log(params.categoryName);

  const getCategory = async () => {
    try {
      const res = await axios.get(`/api/categories/${params.categoryName}`);
      console.log(res.data);
      setCategory(res.data);
      setSubCategories(res.data.subCategories);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    getCategory();
  }, [params]);

  const handleClickOpen = () => {
    setOpenAddSubCategoryDialog(true);
  };

  const handleClickOpenPost = () => {
    setOpenAddPostDialog(true);
  };

  const handleClose = () => {
    setOpenAddSubCategoryDialog(false);
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

  async function addSubCategory(name: string) {
    try {
      const res = await axios.post(
        `/api/categories/${category._id}/subcategories`,
        { name }
      );
      console.log(res.data);
      setSubCategories([...subCategories, res.data]);
    } catch (error) {
      toast.error((error as any)?.response?.data);
    }
  }

  function addPost(post: string) {
    setPosts([...posts, posts]);
  }
  const handleRemoveItem = (index: number) => {
    const updatedCategories = [...subCategories];
    updatedCategories.splice(index, 1);
    setSubCategories(updatedCategories);
  };

  const removeSubCategory = async (e:any, index:number, id:string) => {
    e.stopPropagation()
    const res = await axios.delete(`/api/subcategories/${id}`)

    handleRemoveItem(index);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer variant="permanent" open={open} sx={{ flex: 1 }}>
          <Divider />
          <List>
            {subCategories.map((subCategory: any, index: any) => (
              <ListItem
                key={index}
                onClick={() =>
                  navigate(`/categories/${category.name}/${subCategory.name}`)
                }
                disablePadding
                sx={{
                  // display: "block",
                  bgcolor:
                    location.pathname ===
                    `/categories/${encodeURIComponent(subCategory.name)}`
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
                    primary={subCategory.name}
                    style={{
                      opacity: open ? 1 : 0.95,
                      fontSize: open ? "1rem" : "0.5rem",
                      color: open ? "black" : "black",
                    }}
                  />
                </ListItemButton>

                {/* remove list item */}

                {admin && (
                  <Button onClick={(e)=>removeSubCategory(e, index, subCategory._id)}>
                    {open ? (
                      <div id="remove"> Remove</div>
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
              onClick={handleClickOpen}
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
                  primary={"Add Subcategory"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <AddSubCategoryDialog
        addSubCategory={addSubCategory}
        open={openAddSubCategoryDialog}
        handleClose={handleClose}
      />
      {/* <PostListTemplate /> */}
    </>
  );
}

//title - parent category

// subCategory section(
// title: snippet
// add , delete, edit)

//post section(
// title: snippet
// add, delete, edit)

// category/post
//category/sub/sub/post
