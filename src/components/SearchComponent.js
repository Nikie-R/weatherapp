import React, { useState } from "react";
import {
  Container,
  Button,
  Input,
  Box,
  List,
  Flex,
  ListItem,
} from "@chakra-ui/react";

const SearchComponent = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  //search as the user types
  const handleInputChange = async (event) => {
    const { value } = event.target;
    setSearchValue(value);

    // Fetch autocomplete results when the search input changes
    const accessToken = process.env.REACT_APP_GEOCODE_TOKEN;
    //Added if to avoid too many requests to the API
    if (value.length > 3) {
      const apiUrl = `https://us1.locationiq.com/v1/autocomplete.php?key=${accessToken}&q=${value}&limit=5&format=json`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (Array.isArray(data)) {
          setAutocompleteResults(data);
        } else {
          setAutocompleteResults([]);
        }
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
      }
    }
  };

  const handleResultClick = (result) => {
    setSearchValue(result.display_name);
  };

  const handleSearchClick = async () => {
    //Call the onSearch function with the selected location's latitude and longitude
    if (autocompleteResults.length > 0) {
      const selectedResult = autocompleteResults[0];
      onSearch({ lat: selectedResult.lat, lon: selectedResult.lon });
      //Clear the input field
      setSearchValue("");
      setAutocompleteResults([]);
      const result = {
        display_name: "",
      };
      handleResultClick(result);
    }
  };

  return (
    <div>
      <Container
        bg="white.500"
        maxW="1800"
        h="650"
        centerContent
        position="relative"
      >
        {/* Background overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundColor="white"
        />

        {/* Content */}
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Box
            width={{ base: "90%", sm: "80%", md: "70%", lg: "60%" }}
            position="relative"
            zIndex={1}
          >
            <Input
              type="text"
              placeholder="Enter location..."
              value={searchValue}
              onChange={handleInputChange}
              style={{ width: "100%" }}
              size="lg"
              color="black"
            />
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleSearchClick}
              mt={4}
              width="100%"
            >
              Search
            </Button>

            {/* Display autocomplete results */}
            <List mt={4} maxH={200} overflowY="auto">
              {autocompleteResults.map((result) => (
                <ListItem
                  key={result.place_id}
                  onClick={() => handleResultClick(result)}
                >
                  {result.display_name}
                </ListItem>
              ))}
            </List>
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export default SearchComponent;
