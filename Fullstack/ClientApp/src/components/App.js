import React, { useState, useEffect } from 'react';
import '../App.css';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';


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
    baseURL: 'https://18.221.234.152/Tasks/'
})




function App() {



  var columns = [
  
      { title: "ID", field: "ID", type: "numeric", hidden: true },
      { title: "Name", field: "name" },
      { title: "DateStart", field: "date_Start", type: "datetime" },
      { title: "DateFinish", field: "date_Finish", type: "datetime" },
      { title: "Status", field: "status" }
  ]

    var columns1 = [

        { title: "ID", field: "ID", type: "numeric", hidden: true },
        { title: "Task", field: "task" },
        { title: "DateStart", field: "date_Start", type: "datetime" },
        { title: "DateFinish", field: "date_Finish", type: "datetime" }
        
    ]
    const [col, setCol] = useState(columns); //table data
    const [text, setText] = useState("Tasks"); //table data
    const [data, setData] = useState([]); //table data
  //for error handling
  const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        api.get("")
            .then(res => {


                if (res.data == undefined)
                    return;

                setData(res.data)


            })
            .catch(error => {
                console.log("Error")
            })

    }, [])

    const onButtonClick = () => {
        // `current` points to the mounted text input element
        debugger
        if (col.length != columns1.length)
            setCol(columns1)
        
        setText("ExpriringTasks")
   
        api.post("GetExpiringTasks")
        .then(res => {
          
            
                if (res.data == undefined)
                    return;
         
               setData(res.data)
                
           
         })
         .catch(error=>{
             console.log("Error")
         })
     

    };

    const onButtonClick1 = () => {
        // `current` points to the mounted text input element
        debugger
        if (col.length != columns.length)
            setCol(columns)

        setText("Tasks")
        api.get("")
            .then(res => {


                if (res.data == undefined)
                    return;

                setData(res.data)


            })
            .catch(error => {
                console.log("Error")
            })


    };
 

  
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

                        title={text}
                            columns={col}
                        icons={tableIcons}
                            data={data}

                        />
                 
                  
                </Grid>
              
          <Grid item xs={3}></Grid>
            </Grid>
            <button onClick={onButtonClick}>Expiring Tasks</button>
            <button onClick={onButtonClick1}>All Tasks</button>
          
             
             
             
    </div>
 
        
    
  


  );
}

export default App;