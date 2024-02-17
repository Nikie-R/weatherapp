import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.900" p={4} color="white">
      <Text textAlign="center">
        &copy; {new Date().getFullYear()} Weather App. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
