import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    toolbar: {
        margin: '0 100px',
        height: '100px',
        borderBottom: '1px solid #dedede',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            margin: '0',
        }
    },
    search: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        }
    }
}));