import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "@components/navbar";

const PATH = "http://localhost:3000/";

const generateString = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
const Generator = () => {
  //const theme = useTheme();

  const [links, setLinks] = useState([]);

  const addLink = (short_url, long_url,count=0) => {
    setLinks([
      ...links,
      {
        short_url,
        long_url,
        count,
      },
    ]);
  };

  const [url, setUrl] = useState();


  const generateUrl = () => {
    addLink(generateString(), url);
    console.log(window.localStorage.getItem("data"));

  };

  const copyUrl = (e) => {
    const url = `${PATH}${e.target.value}`;
    alert(url);
  };

  const saveData = ()=>{
    // alert("EYO")
    const data = JSON.parse(window.localStorage.getItem("data")) || []
    window.localStorage.setItem("data",JSON.stringify([...data, ...links]))
    setLinks([])
  };

  
  return (
    <>
      <Navbar></Navbar>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack maxWidth={1000} gap={3} my={3}>
          <Typography>Put the link you want to shorten below.</Typography>
          <TextField
            name="url"
            onChange={(e) => setUrl(e.target.value)}
            id="outlined-required"
            label="Your URL"
          />
          <Button
            onClick={() => {
              generateUrl();
            }}
            variant="contained"
            color="secondary"
          >
            Generate Link
          </Button>
          {!!links?.length &&
            links.map((link, index) => (
              <Box key={index}>
                <TextField
                  id="outlined-read-only-input"
                  label="Short url"
                  onClick={copyUrl}
                  value={`${link?.short_url}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Long url"
                  value={link?.long_url}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            ))}
        <Button
          onClick={() => {
            saveData()
          }}
          variant="contained"
          color="secondary">
            Save links
        </Button>
        </Stack>
        
      </Container>
    </>
  );
};

export default Generator;