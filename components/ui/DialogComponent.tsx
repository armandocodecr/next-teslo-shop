import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ReactPlayer from 'react-player';
import { UiContext } from '../../context';
import { useContext } from 'react';

export const DialogComponent = () => {
  const { handleCloseDialog, isDialogOpen } = useContext( UiContext )

  return (
    <Dialog open={isDialogOpen}>
        <button id='boton-dialog' onClick={handleCloseDialog}>Cerrar</button>
        <DialogTitle sx={{ padding: '10px 0px !important' }}>¡Aviso! 🔊</DialogTitle>
        <p>
          Debido a que actualemente no tengo la posibilidad de pagar un dominio, habrán
          secciones de la página a las que no se podrán acceder, debido a que dichas secciones
          contienen componentes que hacen uso de Serverless function. Los dominios no te dan la posibilidad
          de hacer uso de estas, a no ser que pagues dicho dominio.
        </p>
        <p>
          Por este problema, adjunto el link a un video donde explico y enseño este proyecto a detalle
          para que se pueda observar correctamente su funcionamiento. 🎥
        </p>
        <h2 style={{ marginTop: 10 }}>
          Video demo 👇
        </h2>
        <div id='container-video-demo'>
          <ReactPlayer width={500} style={{ marginTop: 10 }} url='https://www.youtube.com/watch?v=XbZQ1iZYjNA' />
        </div>
    </Dialog>
  );
}

// export default function DialogComponent() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value: string) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
