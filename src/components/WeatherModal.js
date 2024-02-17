import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";

const WeatherModal = ({ isOpen, onClose, weatherData }) => {
  return (
    <Modal height="50%" isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Weather Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center">
            {weatherData.list && weatherData.list.length > 0 && (
              <>
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  mb={2}
                >
                  {weatherData.city.name}
                </Text>
                <Text fontSize={{ base: "lg", md: "xl" }}>
                  Date: {weatherData.list[0].dt_txt.substring(0, 16)}
                </Text>
                <Flex justify="center" align="center" mt={4}>
                  <Box mr={4}>
                    <Image
                      src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      boxSize="100px"
                    />
                    <Text fontSize={{ base: "lg", md: "xl" }} mt={2}>
                      {weatherData.list[0].weather[0].main}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="5xl" fontWeight="bold">
                      {Math.round(weatherData.list[0].main.temp)}&deg;C
                    </Text>
                    <Text fontSize={{ base: "lg", md: "xl" }} mt={2}>
                      Humidity: {weatherData.list[0].main.humidity}%
                    </Text>
                    <Text fontSize={{ base: "lg", md: "xl" }} mt={2}>
                      Wind Speed:{" "}
                      {(weatherData.list[0].wind.speed * 3.6).toFixed(2)} km/h
                    </Text>
                  </Box>
                </Flex>
              </>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WeatherModal;
