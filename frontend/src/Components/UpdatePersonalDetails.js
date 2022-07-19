import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from '../components/useToken';
import { Button, Container, Row, Col, Form, Modal, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BiEdit } from 'react-icons/bi';

const personalDetailsSchema = yup.object({
    vat_number: yup.string().required('This is required'),
}).required();

export const UpdatePersonalDetails = () => {
    const { token } = useToken();
    const [data, setData] = useState([]);
    const [dataCheck, setDataCheck] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(personalDetailsSchema)
    });

    useEffect(() => {
        if (Object.keys(data).length <= 0) {
            axios.get("personal-details", {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                setData(response.data);
            });
        }
    }, [data]);

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setDataCheck(true)
        }
    }, [data])

    const onSubmit = (e) => {
        e.preventDefault();
        const vat_number = e.target[0].value;
        axios.put("http://localhost:5000/personal-details", { "vat_number": vat_number }, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Access-Control-Allow-Origin": "*"
            }
        }).then(() => {
            window.location.reload();
        })
    }

    return (
        <Container className="mb-5">
            <Row className="d-flex justify-content-center">
                <Col xs={12} md={9}>
                    {dataCheck ? (
                        <>
                            <h5 className="mb-5 text-start d-flex align-items-center">Personal Details<BiEdit className="ms-2 hover" onClick={handleShow} /></h5>
                            <Table striped borderless>
                                <thead>
                                    <tr>
                                        <th>VAT #</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{data.vat_number}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </>
                    ) : <Row className="d-flex justify-content-center">
                        <Col xs={12} md={4}>
                            <h5>No VAT number found.</h5>
                        </Col>
                    </Row>
                    }


                    <Modal show={show} onHide={handleClose} centered>
                        <form onSubmit={(e) => handleSubmit(onSubmit(e))}>
                            <Modal.Header>
                                <Modal.Title>Update Bank A/C details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control type="string" name="vat_number" placeholder="vat #" {...register("vat_number")} />
                                    {errors ? <p className="text-danger">{errors.vat_number?.message}</p> : null}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </Col>
            </Row>
        </Container>
    )
}
