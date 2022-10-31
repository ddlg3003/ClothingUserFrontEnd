import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    image: {
        borderRadius: "50%"
    },

    root: {
        display: 'flex',
        alignItems: 'stretch',
    },

    profileNav: {
        padding: "10px",
        width: '220px',
        color: 'black',
        margin: '10px',
        textAlign: 'center',
        lineHeight: '75px',
        display: 'block',
        flexShrink: '0'
    },

    profileMain: {
        margin: '10px',
        position: 'relative',
        flexGrow: '1',
        width: '900px',
        height: "600px",
        boxSizing: 'border-box',
        display: 'block',
        padding: "30px"
    },

    title: {
        // marginLeft:"70px",
        // marginBottom: "30px",
        fontSize: '25px',
        display: 'block',
        padding: '10px 0'
    },

    titleTop: {
        letterSpacing:"2px",
        fontSize:"25px",
        fontWeight:"normal",
        align:"center",
        paddingBottom:"40px",
        paddingTop:"60px",
    },
    
    body: {
        marginBottom: "50px",
        // background: "#cfcfe1"
    },

}))