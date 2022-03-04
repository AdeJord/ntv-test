import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import axios from "axios";
 
 
function SearchCar()
{
  const [search,setSearch] =useState('');
  const [record,setRecord] = useState([]);
 
  
    // On Page load display all records 
    const loadEmployeeDetail = async () =>  
    {
      var response = fetch('http://localhost:5000/api/v1/employee')
         .then(function(response){
            return response.json();
          })
         .then(function(myJson) {
            setRecord(myJson);
          });
    }
    useEffect(() => {
      loadEmployeeDetail();
    }, []);
 
    // Search Records here 
    const searchRecords = () =>
    {
        axios.get(`http://localhost:5000/api/v1/employee/searchRecord/${search}`)
        .then(response => {
          setRecord(response.data);
        });
         
    }
 
    const loadRecordAgain = () =>
    {
      var response = fetch('http://localhost:5000/api/v1/employee')
      .then(function(response){
         return response.json();
       })
      .then(function(myJson) {
         setRecord(myJson);
       });
         
    }
    useEffect(() => {
      loadRecordAgain();
    }, []);
 
 
  return(
    <section>  
    <div class="container">  
    <h4 className="mb-3 text-center mt-4">Search Records in MERN</h4>
      <div class="row mt-3">
      <div class="col-sm-11">
        <div class="input-group mb-4 mt-3">
          <div class="form-outline">
           <input type="text" id="form1"    onKeyDown={loadRecordAgain} onKeyUp={searchRecords} onChange={(e)=>setSearch(e.target.value)} class="form-control" placeholder="Search Employee Here" style={{backgroundColor:"#ececec"}}/>
        </div>
        {/* <button type="button" onClick={searchRecords}  class="btn btn-success">
            <i class="fa fa-search" aria-hidden="true"></i>
        </button> */}
        </div>  
        <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>Registration</th>
                <th>Keys</th>
                <th>Company</th>
                <th>Comments</th>
            </tr>
            </thead>
            <tbody>
     
            {record.map((Cars)=>
                <tr>
                <td>{Cars.regNo}</td>
                <td>{Cars.keys}</td>
                <td>{Cars.company}</td>
                <td>{Cars.comments}</td>
                </tr>
                )} 
            </tbody>
        </table>
      </div>
      </div>
    </div>
   </section>
  )
}
 
export default SearchCar;