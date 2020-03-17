import React  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import Alta  from  '../ALTA/indexALTA'

export default function ModalAltaPlanilla( props ) {
  const [ancho, setAncho] = React.useState(window.innerWidth)

//    const caturaancho = () => {
//   window.addEventListener ( 'resize' , (  ) => {
//     setAncho ( window.innerWidth )
//     console.log(ancho)
//   } )
// }
  return (
    <div style = { { width : ancho } }>
      <Dialog
        style = { { width : ancho } }
        open={props.show}
        onClose={ props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alta/>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}