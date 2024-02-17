import React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Logo from "../images/weather-logo.png";

const Header = () => {
  return (
    <Box bg="blue.500" p={4} color="white">
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <Box p="2">
          <Image
            src={Logo}
            alt="Weather Logo"
            boxSize={{ base: "40px", md: "50px" }}
          />
        </Box>
        <Box p="2">
          <Heading size="md" textAlign="center" mt={{ base: 2, md: 0 }}>
            Weather App
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
