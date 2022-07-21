import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Lottie from "lottie-react";
import System from '../media/home.json';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`

export const Home = () => {
  return (
    <StyledContainer>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="w-75 mx-auto">
            <Lottie animationData={System} loop={true} />
          </div>
        </Col>
        <Col xs={10} md={6} className="mt-4 mt-md-0 text-center d-flex flex-column justify-content-center">
          <h1>Lancer</h1>
          <h6>For all your freelancing finance necessities!</h6>
        </Col>
      </Row>
    </StyledContainer>
  )
}
