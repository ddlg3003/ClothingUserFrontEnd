import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    totalText: {
        marginRight: '70px'
    },

    inputField: {
        width: '70px',
        padding: '10px',    
        fontSize: '18px'
    },

    checkoutButton: {
        marginRight: '380px!important',
        color: 'white!important',
        backgroundColor: 'black!important',
        paddingRight: '50px!important',
        paddingLeft: '50px!important',
        paddingTop: '14px!important',
        paddingBottom: '14px!important',
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '40px',
        marginBottom: '40px'
    },

    removeItemButton: {
        '&:hover': {
            cursor: 'pointer',
            opacity: '0.5'
        }
    },

    itemName: {
        verticalAlign: 'top',
        marginLeft: '10px'
    },

}));