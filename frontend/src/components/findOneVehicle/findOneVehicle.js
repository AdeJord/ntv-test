import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import styled from 'styled-components';
import regInput from './regInput';
import { getCarByRegistration } from '../../services/api';
import { useParams } from "react-router-dom";

/*
I think I have to add the code here to get the reg number and use mongoose to search for it
and return into the answer?
*/

const useStyles = makeStyles((theme) => ({
  wrap: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#dddddd',
    float: 'left'
  },
  results: {
    padding: '10px',
    margin: '50px',
    width: '250px',
    height: '250px',
    backgroundColor: '#aaaa',
    color: 'black',
    borderWidth: '4px',
    borderColor: 'black',
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '20px',
    textTransform: 'upperCase'
  },
  content: {
    fontSize: '40px',
    width: 'calc(100% - 40px)',
    height: 'auto',
    padding: '20px',
    backgroundColor: '#cccccc',
    float: 'left'
  },
  submitBtn: {
    fontSize: '20px',
    width: '100px',
    height: 'auto',
    padding: '15px',
    backgroundColor: '#cccccc',
    borderRadius: '10px',
    paddingBottom: '10px',
    marginLeft: '20px'
  },
  form: {
    fontSize: '20px',
    width: '100px',
    height: 'auto',
    padding: '15px',
    borderRadius: '10px',
    paddingBottom: '10px'
  },
  input: {
      fontSize: '30px',
      height: '75px',
      width: '300px',
      margin: '20px',
      backgroundColor: 'yellow',
      color: 'black',
      borderWidth: '4px',
      borderColor: 'black',
      borderRadius: '10px',
      textAlign: 'center', 
      textTransform: 'upperCase'
  }
}));

/*const Container = styled.div`
display: flex;
flex-direction: column
`*/





export default function FindOneVehicle() {
  const classes = useStyles();
  const [getCar, setCar] = React.useState([]);



  //when submit clicked need to save the input (regNo) and use
  //that to search for vehicle eg, RDA877L
  // ALSO NEED TO REFACTOR SO NOT USING GETELEMENTBYID
  async function handleClick () {
    let searchReg = document.getElementById('regInput');
    await getCarByRegistration(searchReg.value).then(response => {
      // alert(JSON.stringify(response.data, null, 2));
      if (response.data.length > 0) {
        setCar(response.data);
      } else {
        alert('Nothing on that reg');
      }
      console.log(`cars ${response.data.length}`)
    });
};

  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        Find one vehicle
      </div>
      <input id="regInput" className={classes.input} placeholder="Enter Reg Here" /> 
      <button onClick={handleClick} className={classes.submitBtn}>Submit</button>
      <div id="resultsContainer" className={classes.results}>
      {getCar.length > 0 &&
          getCar.map(car => {
            return(
              <div className={classes.car}>
                <div className={classes.detail}>Registration: {car.regNo}</div>
                <div className={classes.detail}>Keys: {car.keys}</div>
                <div className={classes.detail}>Company: {car.company}</div>
                <div className={classes.detail}>Comments: {car.comments}</div>
              </div>
            )
        })}
        {getCar.length === 0 &&
          <p>Results</p>
        }
      </div>
    </div>
    

  );
}


