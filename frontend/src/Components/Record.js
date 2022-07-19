import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import useToken from '../components/useToken';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import formatDate from "../helpers/formatDate";
import formatter from "../helpers/formatCurrency";

const StyledCol = styled(Col)`
  height: 15vh;
`
const StyledSpan = styled.span`
  font-size: .8rem;
  margin: 0;
`
const StyledP = styled.p`
  font-size: .8rem;
  margin: 0;
`

export const Record = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [dataCheck, setDataCheck] = useState(false);
    const { token } = useToken();

    useEffect(() => {
        if (Object.keys(data).length <= 0) {
            axios.get(`/records/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                setData(response.data);
            }).catch(e => console.log(e));
        }
    }, [data]);

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setDataCheck(true);
        }
    }, [data])

    return (
        <Container fluid="lg">
            {dataCheck ? (
                <>
                    <Row className="justify-content-center bg-primary p-5 d-md-flex d-none text-white">
                        <Col md={6} className="text-start">
                            <h6 className="m-0 fw-bold">Billed to</h6>
                            <StyledP className="m-0">{data[4].employer_name}</StyledP>
                            <StyledP className="m-0">{data[4].employer_line_1}</StyledP>
                            <StyledP className="m-0">{data[4].employer_line_2}</StyledP>
                            <StyledP className="m-0">{data[4].employer_town}</StyledP>
                            <StyledP className="m-0">{data[4].employer_region}</StyledP>
                            <StyledP className="m-0 mb-5">{data[4].employer_country}</StyledP>

                            <div>
                                <StyledSpan className="m-0 fw-bold">Invoice No. </StyledSpan><StyledSpan>{data[0].id}</StyledSpan>
                            </div>
                            <div>
                                <StyledSpan className="m-0 fw-bold">Date </StyledSpan><StyledSpan>{formatDate(data[0].date_created)}</StyledSpan>
                            </div>
                        </Col>
                        <Col className="text-end">
                            <h1 className="m-0">Invoice</h1>
                            <StyledP className="m-0">{data[1].first_name + ' ' + data[1].last_name}</StyledP>
                            <StyledP className="m-0">{data[2].line_1}</StyledP>
                            <StyledP className="m-0">{data[2].line_2}</StyledP>
                            <StyledP className="m-0">{data[2].town}</StyledP>
                            <StyledP className="m-0">{data[2].region}</StyledP>
                            <StyledP className="m-0 mb-5">{data[2].country}</StyledP>
                            <h6 className="m-0 fw-bold">Bank Details</h6>
                            <div>
                                <StyledSpan className="m-0 fw-bold">BIC </StyledSpan><StyledSpan>{data[1].bic}</StyledSpan>
                            </div>
                            <div>
                                <StyledSpan className="m-0 fw-bold">IBAN </StyledSpan><StyledSpan>{data[1].iban}</StyledSpan>
                            </div>
                            <div>
                                <StyledSpan className="m-0 fw-bold">VAT # </StyledSpan><StyledSpan>{data[3].vat_number}</StyledSpan>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center p-5 d-md-flex d-none">
                        <Col md={10} className="border-bottom border-1 border-primary mb-2">
                            <Row>
                                <Col md={4}>
                                    <StyledP className="fw-bold">Item Description</StyledP>
                                </Col>
                                <Col md={4}>
                                    <StyledP className="fw-bold">Price</StyledP>
                                </Col>
                                <Col md={4} className="text-end">
                                    <StyledP className="fw-bold mb-3">Total</StyledP>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={10} className="mb-3">
                            <Row>
                                <Col md={4}>
                                    <StyledP>{data[0].job_description}</StyledP></Col>
                                <Col md={4}><StyledP>{formatter.format(data[0].gross_pay)}</StyledP></Col>
                                <Col md={4} className="text-end" />
                            </Row>
                        </Col>
                        <StyledCol md={10} className="border-bottom border-3 border-primary mb-4" />
                        <Col md={10} className="d-flex flex-row justify-content-between">
                            <StyledP className="fw-bold">Grand Total</StyledP>
                            <StyledP>{formatter.format(data[0].gross_pay)}</StyledP>
                        </Col>
                    </Row>
                    <Row className="justify-content-center bg-primary p-5 d-md-flex d-none text-white">
                        <Col md={9} lg={6} className="text-center">
                            <StyledP className="mb-2">Thank You!</StyledP>
                            <StyledP className="mb-2">Get in touch with any queries you may have.</StyledP>
                            <StyledP className="m-0">{data[3].email}</StyledP>
                        </Col>
                    </Row>
                </>
            ) : <Row className="d-flex flex-column justify-content-center vh-100 text-center"><h3>Something went wrong</h3></Row>}
        </Container>
    )
}