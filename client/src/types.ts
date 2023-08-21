import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";


export interface Post {
  _id: string;
  title: string;
  body: string;
  image: string;
  // Other fields
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}