//uzima shortURL (ID) iz linka i prikazuje statistike, tjst counter/broj klikova za taj specifican link
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router"

import {
    Container,
    Typography,
    Stack,
    Button,
    TextField,
} from "@mui/material";
import Navbar from "@components/navbar";

const Analytics = () =>{
    
    //get id from link
    const router = useRouter();
    const {id} = router.query;
    
    const PATH = "http://localhost:3000/shortener/";
    
    const [data,setData] = useState([])
    const [selected,setSelected] = useState()
    
    useEffect(()=>{
        if(!id) return;
        console.log(id);
        console.log(router.pathname);
        console.log(router.asPath);
        console.log("===============================")
        
        const dat = JSON.parse(window?.localStorage?.getItem("data"));
        setData(dat);  
        console.log("Data Set")
        console.log("===============================")
    },[router]);
    
    useEffect(()=>{
        const select = data?.filter((item)=> item?.short_url == id)?.[0]    
        setSelected(select)
    },[data])
    
    const redirect = ()=>{
        if(!selected) return;
        alert("Redirected")
        console.log("Redirected");
        console.log("===============================")
        window.location.replace(selected?.long_url);
    };
    
    const deleteLink = () =>{
        if(!selected) return;
        
        const dataAfterDelete = data?.filter((item)=> item?.short_url != id)
        console.log(data);
        console.log("+++++")
        console.log(dataAfterDelete)
        window.localStorage.setItem("data",JSON.stringify(dataAfterDelete));
        
        console.log("Brisanje Linka");
        console.log("===============================")
        console.log(PATH);
        window.location.replace(PATH);
    }
    
    return <>
        <Navbar></Navbar>
        <Container sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",

        }}>
            <Stack maxWidth={1000} width={500} gap={3} my={3}>
                <Stack>
                    <Typography mb={2}>Link ID:</Typography>
                    <TextField
                    id="outlined-read-only-input"
                    label="Short url ID"
                    value={selected?.short_url || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                </Stack>
                <Stack>
                    <Typography mb={2}>Full shortified link:</Typography>
                    <TextField
                    id="outlined-read-only-input"
                    label="Short url"
                    value={selected?.short_url ? `${PATH}${selected?.short_url}` : ""}
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                </Stack>
                <Stack>
                    <Typography mb={2}>Original link:</Typography>
                    <TextField
                    id="outlined-read-only-input"
                    label="Long url"
                    onClick={redirect}
                    value={selected?.long_url || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                </Stack>
                <Stack>
                    <Typography mb={2}>Number of times the link was used:</Typography>
                    <TextField
                    id="outlined-read-only-input"
                    label="Times Clicked"
                    value={selected?.count || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                </Stack>
                <Button 
                    onClick={() => {
                        deleteLink();
                    }}
                    variant="contained"
                    color="secondary"
                    >
                Delete Link
                </Button>
            </Stack>
        </Container>
    </>
};

export default Analytics;