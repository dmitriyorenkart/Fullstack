import React, { useState, useEffect } from 'react';
import '../App.css';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';


import Paper from '@material-ui/core/Paper';

import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

function Rolling_Retention7(data1) {


    var lifeSpan = data1.reduce(function (accumulator, currentValue) {
        if (datediff(new Date(currentValue.date_Registration), new Date(currentValue.date_LastActivity) )> 7)
            return accumulator + 1
        else return accumulator + 0
        return accumulator + 0
    }, 0);
    var LastActive = data1.reduce(function (accumulator, currentValue) {
        if (datediff(new Date(currentValue.date_LastActivity), new Date()) <= 7)
            return accumulator + 1
        else return accumulator + 0
        return accumulator + 0
    }, 0);

    if (LastActive == 0)
        return 0
    return lifeSpan / LastActive;
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
function dateformat(date) {
    debugger
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year,month,day].join('-');
}
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
    baseURL: 'http://18.221.234.152/Users/'
})




function App() {



  var columns = [
  
      { title: "UserID", field: "userID", type: "numeric", editable:"onAdd"},
      { title: "Date_Registration", field: "date_Registration", type: "date" },
      { title: "Date_LastActivity", field: "date_LastActivity", type: "date"}
  ]
    const [data, setData] = useState([]); //table data
    const [metrica, setMetrica] = useState([]); //table data
  //for error handling
  const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])


    useEffect(() => {
    api.get("")
        .then(res => {
          
            
                if (res.data == undefined)
                    return;
                setData(res.data)
             setMetrica(Rolling_Retention7(res.data))

           
         })
         .catch(error=>{
             console.log("Error")
         })
     
}, [])

    
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
      if (newData.date_Registration === ""){
          errorList.push("Please enter date Registration")
    }
      if (newData.date_LastActivity === ""){
          errorList.push("Please enter date LastActivity")
    }


      if (errorList.length < 1) {
          debugger
          newData.date_Registration = dateformat(newData.date_Registration);
          newData.date_LastActivity = dateformat(newData.date_LastActivity);
        api.patch("/" + newData.userID, newData)
            .then(res => {
            
        const dataUpdate = [...data];
          const index = oldData.tableData.id;
                dataUpdate[index] = newData;
               
                setData([...dataUpdate]);
                setMetrica(Rolling_Retention7(dataUpdate))
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
      let errorList = []
      if (newData.date_Registration === undefined) {
          errorList.push("Please enter valid date Registration")
      }
      if (newData.date_LastActivity === undefined) {
          errorList.push("Please enter valid date LastActivity")
      }


    if(errorList.length < 1){ //no error
      api.post("/", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
          setData(dataToAdd);
          setMetrica(Rolling_Retention7(dataToAdd))
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  const handleRowDelete = (oldData, resolve) => {
    
      api.delete("/" + oldData.userID)
      .then(res => {
        const dataDelete = [...data];
          const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
          setData([...dataDelete]);
          setMetrica(Rolling_Retention7(dataDelete))
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  
    return (

    <div className="App">
      
      <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            <MaterialTable
              title="Users"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                  onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {

                          handleRowUpdate(newData, oldData, resolve);

                      }),
                  onRowAdd: (newData) =>
                      new Promise((resolve) => {
                          handleRowAdd(newData, resolve)
                      }),
                  onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                          handleRowDelete(oldData, resolve)
                      }),
              }}
                    />
                    <div style={{ fontSize: '27px' }}>Rolling_Retention 7 day: {metrica} </div>
                </Grid>
              
          <Grid item xs={3}></Grid>
            </Grid>
            <Paper>
                {data.length > 0 && data != undefined && (
                <Chart

                        data={Array.from(new Array(data.length).keys()).map((e, x) => ({ 'id': String(data[x].userID), 'lifeSpan': datediff(new Date(data[x].date_Registration), new Date(data[x].date_LastActivity)) }))}

                    >
                        <ArgumentAxis />
                        <ValueAxis max={4} />

                        <BarSeries
                            valueField="lifeSpan"
                            argumentField="id"
                        />
                        <Title text="Life span" />
                        <Animation />
                    </Chart>
                     
                )}
                </Paper>
           
          
             
             
             
    </div>
 
        
    
  


  );
}

export default App;