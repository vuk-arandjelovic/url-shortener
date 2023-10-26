// Prikazivanje liste svih linkova koji su generisani, i redirect na analyticu onclick za svaki
import React,{useState, useEffect} from "react"
import { Container, Stack, Button, TextField } from "@mui/material"; 
import Navbar from "@components/navbar";

const LinkList = () =>{

    const PATH = "http://localhost:3000/";
    const PATH_APPEND = "/analytics"; 

    const [data,setData] =  useState([])

    const redirect = (id) =>{
        if(!id) return;
        console.log("Redirected");
        window.location.replace(`${PATH}${id}${PATH_APPEND}`);
    }

    const getDataFromStorage = ()=>{
        try{
            console.log("try")
            return JSON.parse(window.localStorage.getItem("data"))
        }catch(e){
            console.log("catch")
            return null
        }
    }
    useEffect(()=>{
        console.log("useEffect getting data")
        const storageData = getDataFromStorage()
        if(storageData){
            setData(storageData)
        console.log("data gotten")
    }
    },[])

    return <>
         {/* <Container sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",

        }}> */}
        <Navbar></Navbar>
        <Stack sx={{display:"flex", alignItems:"center"}}>
            {/* map data items, dynamic component */}
            {
            data && data.map((item,index)=>{
                return (
                        <Stack key={index} direction={"row"} maxWidth={1000} width={1000} gap={3} my={3}>
                            <TextField
                            id="outlined-read-only-input"
                            label="Link ID"
                            value={item?.short_url || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField
                            id="outlined-read-only-input"
                            label="Original link"
                            value={item?.long_url || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                            <Button
                                onClick={()=>{redirect(item?.short_url)}}
                                variant="contained"
                                color="secondary"
                                >
                            View Analytics
                            </Button>
                        </Stack>
                )
            }) 
            }
        {/* </Container> */}
        </Stack>
    </>
}

export default LinkList;