import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    links: {
        position: 'relative',
        fontWeight: 'bolder',
        textDecoration: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
            flexDirection: 'column'
        },
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.03)',
        }
    },
    image: {
        height: '800px',
        marginBottom: '10px',
        width: '600px',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            height: '400px',
            width: '300px',
        },
    },
    cateName: {
        padding: '20px',
        color: '#fff',
        borderRadius: '10px',
        width: '600px',
        backgroundColor: '#1a1a1a',
        [theme.breakpoints.down('sm')]: {
            padding: '10px',
            width: '300px',
        },
    }
}));