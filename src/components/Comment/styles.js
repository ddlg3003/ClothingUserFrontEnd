import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    commentList: {
        width: '860px',
        [theme.breakpoints.down('914')]: {
            width: '500px',
        },
        [theme.breakpoints.down('md')]: {
            width: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '300px',
        },
    }
}));