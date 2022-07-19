import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
import useToken from '../components/useToken';
import formatter from "../helpers/formatCurrency";
import { GiReceiveMoney } from 'react-icons/gi';
import { GiTakeMyMoney } from 'react-icons/gi';
import { HiReceiptTax } from 'react-icons/hi';
import NotFound from '../media/not-found.json';
import Lottie from "lottie-react";

export const Dashboard = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [dataCheck, setDataCheck] = useState(false);
    const { token } = useToken();

    useEffect(() => {
        if (Object.keys(data).length <= 0) {
            axios.get("/dashboard", {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                console.log(response);
                setData(response.data);
                setYears(response.data.years);
            }).catch(e => console.log(e));
        }
    }, [data]);

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setDataCheck(true);
        }
    }, [data])

    const onSubmit = (e) => {
        e.preventDefault();
        const year = e.target.value;
        axios.post("http://localhost:5000/dashboard", { "year": year }, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            setData(response.data);
        }).catch((e) => {
            console.log(e);
        })
    }

    console.log(years.length);

    return (
        <Container className="flex-grow-1 mt-5">
            <Row className="d-flex flex-column justify-content-center">
                <Col xs={12} className="mb-4 text-center">
                    <h1>Dashboard</h1>
                    <h6>Your new home</h6>
                </Col>
            </Row>

            {dataCheck && years.length !== 0 ? (<>
                <form onSubmit={(e) => onSubmit(e)}>
                    <Row className="justify-content-center">
                        <Col xs={8} md={2}>
                            <Form.Select aria-label="select" className="mb-5 mb-md-3" onChange={(e) => onSubmit(e)}>
                                {years.length > 0 ? years.map((year) => {
                                    return <option key={year} value={year}>{year}</option>
                                }) : <option>Nothing found</option>}
                            </Form.Select>
                        </Col>
                    </Row>
                </form>
                <Row className="justify-content-center mb-5 mb-md-0">
                    <Col xs={8} md={3} className="pe-md-3">
                        <div className="bg-secondary rounded-3 p-3 d-flex flex-column justify-content-between">
                            <GiReceiveMoney className="w-25 h-25 px-3 rounded-2 bg-light mb-5" />
                            <div>
                                <p className="m-0">Gross Pay</p>
                                <h5 className="m-0">{formatter.format(data.grossPay)}</h5>
                            </div>
                        </div>
                    </Col>
                    <Col xs={8} md={3} className="pe-md-3 mt-3 mt-md-0">
                        <div className="bg-secondary rounded-3 p-3 d-flex flex-column justify-content-between">
                            <HiReceiptTax className="w-25 h-25 px-3 rounded-2 bg-light mb-5" />
                            <div>
                                <p className="m-0">Tax Due</p>
                                <h5 className="m-0">{formatter.format(data.taxDue)}</h5>
                            </div>
                        </div></Col>
                    <Col xs={8} md={3} className="mt-3 mt-md-0">
                        <div className="bg-secondary rounded-3 p-3 d-flex flex-column justify-content-between">
                            <GiTakeMyMoney className="w-25 h-25 px-3 rounded-2 bg-light mb-5" />
                            <div>
                                <p className="m-0">Net Pay</p>
                                <h5 className="m-0">{formatter.format(data.netPay)}</h5>
                            </div>
                        </div>
                    </Col>
                </Row>
            </>) : <Row><Col xs={12} md={6} className="text-center mx-auto">
                <Lottie animationData={NotFound} loop={true} className="w-50 mx-auto" />
                <h5>No data found</h5>
                <a className="text-primary" href="/add-job-info">Add a job</a></Col></Row>}
        </Container>
    )
}
