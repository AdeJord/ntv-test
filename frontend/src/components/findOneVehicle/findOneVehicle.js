import React from 'react';
import { useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
//import styled from 'styled-components';
import { getCarByRegistration } from '../../services/api';
import { useParams } from "react-router-dom";
import '../../index.css'

/*
I think I have to add the code here to get the reg number and use mongoose to search for it
and return into the answer?
*/

const useStyles = makeStyles((theme) => ({
  wrap: {
    position: "relative",
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
    textAlign: 'left',
    fontSize: '20px',
  },
  content: {
    fontSize: '40px',
    width: 'calc(100% - 40px)',
    height: 'auto',
    padding: '20px',
    backgroundColor: '#cccccc',
    float: 'left',
    position: "relative",
  },
  submitBtn: {
    fontSize: '20px',
    width: '100px',
    height: 'auto',
    padding: '15px',
    backgroundColor: '#cccccc',
    borderRadius: '10px',
    paddingBottom: '10px',
    marginLeft: '20px',
    marginBottom: '30px'
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

export default function FindOneVehicle2() {
  const classes = useStyles();
  const [getCar, setCar] = useState([]);
  let [val, setVal] = useState('');
  const inputRef = useRef();
  
  async function submitHandler (e)  {
    e.preventDefault();
    val = (inputRef.current.value.toUpperCase());
    setVal(inputRef.current.value);


    await getCarByRegistration(val).then(response => {
      //alert(JSON.stringify(response.data, null, 2));
      if (response.data.length > 0) {
        setCar(response.data);
      } else {
        alert('LB Nothing on that reg');
      }
      console.log(`LB Cars matching ${val}:-  ${response.data.length}`)
    });

    console.log(`LB ${val}`)
  }


  return (
    <div className={classes.wrap}>
      <div className={classes.content}>
        Search by Reg Number
      </div>
      <div className="App">
      </div>
      <form onSubmit={submitHandler}>
        <input className={classes.input} ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
      <p>Submit Value: <b>{val}</b></p>
      <div id="resultsContainer" className={classes.results}>
        {getCar.length > 0 &&
          getCar.map(car => {
            return (
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


