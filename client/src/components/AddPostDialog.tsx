import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props{
  open: boolean
  handleClose: () => void
  addPost: (post: string) => void
}


export default function AddPostDialog(props:Props) {

  const [postName, setPostName] = React.useState('')
  

  return (
    <div>


      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add a new post</DialogTitle>
        <DialogContent>
          <TextField 
            value={postName}
            onChange={(e)=>setPostName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Post Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={()=>{
            props.addPost(postName)
            props.handleClose()
          }}>Add Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}