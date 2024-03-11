import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import Dropzone from "react-dropzone";
import { uploadData } from "../service/api";

const Container = styled(Box)`
  border: 1px solid #ddd;
  padding: 20px;
  width: 80%;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Main = styled(Box)`
  width: 100%;
  margin: 0 auto;
`;

const StyledBox = styled(Box)`
  background: #f1b424;
  padding: 10px;
`;

const StyledHead = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const DropContainer = styled("section")({
  backgroundColor: "#f9f9f9",
  padding: "40px",
  borderRadius: "5px",
  margin: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
});

const DropArea = styled("div")({
  border: "2px dashed #ddd",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Upload = styled(UploadIcon)`
  background: #000;
  color: #fff;
  border-radius: 50%;
  padding: 10px;
`;

const Tagline = styled(Typography)`
  margin: 10px;
  padding: 10px;
`;

const Home = () => {
  const [file, setFile] = useState([]);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    const data = file[0];
    formData.append("file", data);
    const res = await uploadData(formData);
    if (res.isSuccess) {
      setStatus(true);
      setFile([]);
    } else {
      setError(true);
    }
  };

  const handleFile = (acceptedFiles) => {
    setFile(acceptedFiles);
  };

  const timeDuration = 1 * 60 * 1000;
  const timeOut = () => {
    setStatus(false);
    setError(false);
  };
  setTimeout(timeOut, timeDuration);

  return (
    <Container>
      <StyledBox>
        <StyledHead>
          <Typography variant="h5">Add from Excel</Typography>
          <CloseIcon fontSize="large" />
        </StyledHead>
      </StyledBox>
      <Main>
        <Typography variant="h6">Add Candidates to Database</Typography>
        <Dropzone onDrop={handleFile} noClick={file.length !== 0}>
          {({ getRootProps, getInputProps }) => (
            <DropContainer>
              <DropArea {...getRootProps()}>
                <input {...getInputProps()} />
                {file.length === 0 && status === false ? (
                  <>
                    <Upload />
                    <Tagline>Upload a .xlsx or .xls file here</Tagline>
                  </>
                ) : status === false ? (
                  <>
                    <Upload />
                    <Tagline>{file[0].name}</Tagline>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </>
                ) : error === false ? (
                  <>
                    <Typography variant="h6" color="success">
                      Thank You!
                    </Typography>
                    <Typography>✔️ File Successfully Uploaded.</Typography>
                    <Typography>
                      Your records will be processed shortly.
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" color="error">
                      Error while processing the data
                    </Typography>
                  </>
                )}
              </DropArea>
            </DropContainer>
          )}
        </Dropzone>
      </Main>
    </Container>
  );
};

export default Home;
