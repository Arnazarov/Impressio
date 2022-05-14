import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 10,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row !important',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    background: '#EEF2FF !important',
  },
  heading: {
    color: '#764AF1',
    textDecoration: 'none',
    fontFamily: 'Macondo !important',
    fontSize: '2.4em !important',
    fontWeight: 'bold !important',
    letterSpacing:'1rem !important',
    [theme.breakpoints.down('xs')]: {
      letterSpacing:'0.1rem !important',
      fontSize: '1.3em !important',
    },
  },
  image: {
    marginLeft: '0 !important',
    [theme.breakpoints.down('xs')]: {
      height: 30
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '350px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5px'
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));