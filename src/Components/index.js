//Base
export { default as Grid } from '@material-ui/core/Grid';
export { default as Button } from '@material-ui/core/Button';
export { default as TextField } from '@material-ui/core/TextField';
export { default as Checkbox } from '@material-ui/core/Checkbox';
export { default as Label } from '@material-ui/core/InputLabel';
export { default as FormGroup } from '@material-ui/core/FormGroup';
export { default as FormControl } from '@material-ui/core/FormControl';
export { default as MenuItem } from '@material-ui/core/MenuItem';
export { default as TextArea } from '@material-ui/core/TextareaAutosize';
export { default as Autocomplete } from '@material-ui/lab/Autocomplete';
export { default as CircularProgress } from '@material-ui/core/CircularProgress';
export { default as IconButton } from '@material-ui/core/IconButton';
export { default as Typography } from '@material-ui/core/Typography';
export { default as Link } from '@material-ui/core/Link';
export { default as Dialog } from '@material-ui/core/Dialog';
export { default as DialogActions } from '@material-ui/core/DialogActions';
export { default as DialogContent } from '@material-ui/core/DialogContent';
export { default as DialogContentText } from '@material-ui/core/DialogContentText';
export { default as DialogTitle } from '@material-ui/core/DialogTitle';

//Icons
export { default as CloseIcon } from '@material-ui/icons/Close';
export { default as PlusIcon } from '@material-ui/icons/Add';
export { default as DeleteIcon } from '@material-ui/icons/Delete';
export { default as EditIcon } from '@material-ui/icons/Edit';

//Layout
export { default as MainLayout } from './Layout/Main';
export { default as PageLayout } from './Layout/PageLayout/Main';
export { default as NavBar } from './Navbar/NavbarContainer';

//Common
export { AuthInput, Calendar, TextAreaCustom } from './Common/FormControlls/FormControlls';
export { default as Preloader } from './Common/Preloader/Preloader';
export { default as ProgressBar } from './Common/ProgressBar/ProgressBar';
export { default as SearchModal } from './Common/SearchModal/SearchModal';
export { default as CustomSelect } from './Common/Cutsom/Select/CustomSelect';
export { FileDrop } from './FileDrop';
export { default as TextEditor } from './Common/TextEditor';
export { default as NotificationMiddleware } from './NotificationMiddleware';

//Wrappers
export { default as ErrorBoundary } from './ErrorBoundry';
export { default as PageNotFound } from './PageNotFound';
export { PrivateRoute } from './PrivateRoute';
export { default as SnackProvider } from './SnackProvider';
