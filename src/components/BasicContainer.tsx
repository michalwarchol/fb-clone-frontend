import { Container, Box } from "@material-ui/core";
import React from "react";

const BasicContainer: React.FC = ({ children }) => {
  return (
    <Box justifyContent="center">
      <Container maxWidth="lg">
        <>{children}</>
      </Container>
    </Box>
  );
};
export default BasicContainer;
