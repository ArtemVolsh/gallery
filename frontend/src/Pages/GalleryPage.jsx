import { Container } from "@mui/material";

const GalleryPage = () => {
  return (
    <div className="page-wrapper">
      <Container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "24px 0",
        }}
      >
        <h1>GalleryPage</h1>
      </Container>
    </div>
  );
};

export { GalleryPage };
