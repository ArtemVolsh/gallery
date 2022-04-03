import { Container } from "@mui/material";

const InfoPage = () => {
  return (
    <div className="page-wrapper">
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "24px 0",
        }}
      >
        <h1 style={{marginBottom: "15px"}}>InfoPage</h1>
      </Container>
    </div>
  );
};

export { InfoPage };
