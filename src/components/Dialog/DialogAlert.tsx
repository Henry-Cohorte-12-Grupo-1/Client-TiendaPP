import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'

export function DialogAlert (open:any,handleClose:any,handleCloseParams:string){
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this category"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            The products with this category will be left without category
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button name='disagree' onClick={() => handleClose(handleCloseParams,'disagree')} color="primary">
                Disagree
            </Button>
            <Button name='agree' onClick={() => handleClose(handleCloseParams,'agree')} color="primary" autoFocus>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
    )
}