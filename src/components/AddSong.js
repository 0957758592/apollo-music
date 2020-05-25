import React from 'react';
import { TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';


function AddSong() {

    const [dialog, setDialog] = React.useState(false)
    

    function handleClose() {
        setDialog(false)
    }

    return (
        <div>
            <Dialog
                open={dialog}
                onClose={handleClose}
            >
                <DialogTitle>
                    Edit Song
                </DialogTitle>
                <DialogContent>
                    <img src="https://ww1.prweb.com/prfiles/2014/04/10/11752526/gI_134971_best-image-web-hosting.png" alt="Song tumbnail"/> 
                </DialogContent>
                <TextField
                    margin="dense"
                    name='title'
                    label="Title"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='artist'
                    label="Artist"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='thumbnail'
                    label="Thumbnail"
                    fullWidth
                />
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={handleClose} color="primary">
                        Add Song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                placeholder="Add YouTube or SoundCloud Url"
                fullWidth
                type='url'
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <Link/>
                        </InputAdornment>
                    )
                }}
            />
            <Button
                variant='contained'
                color="primary"
                endIcon={<AddBoxOutlined />}
                onClick={() => setDialog(true)}
            >
                Add
            </Button>
        </div>
    );
}

export default AddSong;
