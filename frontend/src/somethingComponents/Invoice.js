import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import useToken from './useToken';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import { RiFolderDownloadFill } from 'react-icons/ri';
import styled from 'styled-components';
import formatDate from "../helpers/formatDate";
import formatter from "../helpers/formatCurrency";

const StyledCol = styled(Col)`
  height: 40vh;
`
const StyledSpan = styled.span`
  font-size: 1.6rem;
  margin: 0;
`
const StyledP = styled.p`
  font-size: 1.6rem;
  margin: 0;
`

const StyledButton = styled(Button)`
  border-radius: 50%;
  top: 1em;
  left: 1em;
`

export const Invoice = () => {
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

    const downloadPDF = () => {
        const input = document.querySelector("#invoice");
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: "portrait",
                });
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('invoice.pdf');
            });
    }

    return (
        <>
            <StyledButton size="sm" className="position-fixed text-white" onClick={() => downloadPDF()}><RiFolderDownloadFill /></StyledButton>
            <Container fluid="lg" className="position-relative" id="invoice">
                {dataCheck ? (
                    <>
                        <Row className="justify-content-center bg-primary p-5 d-md-flex d-none text-white">
                            <Col md={10}>
                                <Row className="justify-content-center">
                                    <Col md={6} className="text-start pt-5">
                                        <div className="mb-5">
                                            <h3 className="mb-1 fw-bold">Billed to</h3>
                                            <StyledP className="m-0">{data[4].employer_name}</StyledP>
                                            <StyledP className="m-0">{data[4].employer_line_1}</StyledP>
                                            <StyledP className="m-0">{data[4].employer_line_2}</StyledP>
                                            <StyledP className="m-0">{data[4].employer_town}</StyledP>
                                            <StyledP className="m-0">{data[4].employer_region}</StyledP>
                                            <StyledP className="m-0">{data[4].employer_country}</StyledP>
                                        </div>

                                        <div className="mb-5">
                                            <div>
                                                <StyledSpan className="m-0 fw-bold">Invoice No. </StyledSpan><StyledSpan>{data[0].id}</StyledSpan>
                                            </div>
                                            <div className="mb-5">
                                                <StyledSpan className="m-0 fw-bold">Date </StyledSpan><StyledSpan>{formatDate(data[0].date_created)}</StyledSpan>
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <h3 className="mb-1 fw-bold">Bank Details</h3>
                                            <div>
                                                <StyledSpan className="m-0 fw-bold">BIC </StyledSpan><StyledSpan>{data[1].bic}</StyledSpan>
                                            </div>
                                            <div>
                                                <StyledSpan className="m-0 fw-bold">IBAN </StyledSpan><StyledSpan>{data[1].iban}</StyledSpan>
                                            </div>
                                            <div>
                                                <StyledSpan className="m-0 fw-bold">VAT # </StyledSpan><StyledSpan>{data[3].vat_number}</StyledSpan>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="text-end pt-5">
                                        <h1 className="m-0">Invoice</h1>
                                        <StyledP className="m-0">{data[1].first_name + ' ' + data[1].last_name}</StyledP>
                                        <StyledP className="m-0">{data[2].line_1}</StyledP>
                                        <StyledP className="m-0">{data[2].line_2}</StyledP>
                                        <StyledP className="m-0">{data[2].town}</StyledP>
                                        <StyledP className="m-0">{data[2].region}</StyledP>
                                        <StyledP className="m-0">{data[2].country}</StyledP>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-center p-5 d-md-flex d-none">
                            <Col md={10} className="border-bottom border-1 border-primary mb-3 mt-5">
                                <Row className="mb-4">
                                    <Col md={7}>
                                        <StyledP className="fw-bold">Item Description</StyledP>
                                    </Col>
                                    <Col md={2}>
                                        <StyledP className="fw-bold">Price</StyledP>
                                    </Col>
                                    <Col md={3} className="text-end">
                                        <StyledP className="fw-bold">Total</StyledP>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={10} className="mb-3">
                                <Row>
                                    <Col md={7}>
                                        <StyledP>{data[0].job_description}</StyledP></Col>
                                    <Col md={2}><StyledP>{formatter.format(data[0].gross_pay)}</StyledP></Col>
                                    <Col md={3} className="text-end" />
                                </Row>
                            </Col>
                            <StyledCol md={10} className="border-bottom border-3 border-primary mb-4" />
                            <Col md={10} className="d-flex flex-row justify-content-between mb-5">
                                <StyledP className="fw-bold">Grand Total</StyledP>
                                <StyledP>{formatter.format(data[0].gross_pay)}</StyledP>
                            </Col>
                        </Row>
                        <Row className="justify-content-center bg-primary p-5 d-md-flex d-none text-white">
                            <Col md={9} lg={6} className="text-center my-5">
                                <h4 className="mb-5">Thank You!</h4>
                                <StyledP className="mb-1">Get in touch with any queries you may have.</StyledP>
                                <StyledP className="m-0">{data[3].email}</StyledP>
                            </Col>
                        </Row>
                    </>
                ) : <Row className="d-flex flex-column justify-content-center vh-100 text-center"><h3>Something went wrong</h3></Row>}
            </Container>
        </>
    )
}