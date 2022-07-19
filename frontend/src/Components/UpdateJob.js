import React, { useState, useEffect } from 'react';
import useToken from './useToken';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BiEdit } from 'react-icons/bi';
import { BsCalendar3 } from 'react-icons/bs';
import DatePicker from 'react-date-picker';
import styled from 'styled-components';

const StyledIcon = styled(BiEdit)`
    width: 1.3rem;
    height: 1.3rem;
`
const StyledButton = styled(Button)`
    width: fit-content;

    @media only screen and (min-width: 728px) {
        width: 100%;
    }  
`

const editJobSchema = yup.object({
    jobDescription: yup.string().required('This is required'),
    grossPay: yup.number().required('This is required'),
    dateCreated: yup.date().required('This is required'),
    employerCheck: yup.boolean(),
    employerSelect: yup.string().when("employerCheck", {
        is: false,
        then: yup.string().required('This is required')
    }),
    employerName: yup.string().when("employerCheck", {
        is: true,
        then: yup.string().required('This is required')
    }),
    employerLine1: yup.string().when("employerCheck", {
        is: true,
        then: yup.string().required('This is required')
    }),
    employerLine2: yup.string().when("employerCheck", {
        is: true,
        then: yup.string().required('This is required')
    }),
    employerTown: yup.string().when("employerCheck", {
        is: true,
        then: yup.string().required('This is required')
    }),
    employerRegion: yup.string().when("employerCheck", {
        is: true,
        then: yup.string().required('This is required')
    }),
    employerCountry: yup.string().when("employerCheck", {
        is: true,
        then: yup.string().required('This is required')
    }),
}).required();

export const UpdateRecord = ({ id }) => {
    const { token } = useToken();
    const [show, setShow] = useState(false);
    const [dataCheck, setDataCheck] = useState(false);
    const [data, setData] = useState([]);
    const [employerCheck, setEmployerCheck] = useState(false);
    const [dateTouched, setDateTouched] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(editJobSchema)
    });

    useEffect(() => {
        if (Object.keys(data).length <= 0) {
            axios.get(`/records/edit/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                setData(response.data);
            });
        }
    }, [data]);

    useEffect(() => {
        if (data.length > 0) {
            setDataCheck(true);
        }
    }, [data])

    const handleDate = (isTouched) => {
        if (isTouched == true) {
            setDateTouched(true);
        }
        else {
            setDateTouched(false);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const job_description = e.target[0].value;
        const gross_pay = e.target[1].value;
        const date = e.target[2].value;
        let employer_name = "";
        let employer_line_1 = "";
        let employer_line_2 = "";
        let employer_town = "";
        let employer_region = "";
        let employer_country = "";

        if (employerCheck === true) {
            if (dateTouched === true) {
                employer_name = e.target[50].value;
                employer_line_1 = e.target[51].value;
                employer_line_2 = e.target[52].value;
                employer_town = e.target[53].value;
                employer_region = e.target[54].value;
                employer_country = e.target[55].value;
            }
            else {
                employer_name = e.target[10].value;
                employer_line_1 = e.target[11].value;
                employer_line_2 = e.target[12].value;
                employer_town = e.target[13].value;
                employer_region = e.target[14].value;
                employer_country = e.target[15].value;
            }
        }
        else {
            if (dateTouched === true) {
                employer_name = e.target[48].value;
            }
            else {
                employer_name = e.target[8].value;
            }

            for (let i = 0; i < data.length; i++) {
                if (data[1][i].employer_name === employer_name) {
                    employer_line_1 = data[1][i].employer_line_1;
                    employer_line_2 = data[1][i].employer_line_2;
                    employer_town = data[1][i].employer_town;
                    employer_region = data[1][i].employer_region;
                    employer_country = data[1][i].employer_country;
                }
            }
        }

        axios.put(`http://localhost:5000/records/edit/${id}`, { "job_description": job_description, "gross_pay": gross_pay, "date_created": date, "employer_name": employer_name, "employer_line_1": employer_line_1, "employer_line_2": employer_line_2, "employer_town": employer_town, "employer_region": employer_region, "employer_country": employer_country }, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Access-Control-Allow-Origin": "*"
            }
        }).then(() => {
            window.location.href = 'http://localhost:3000/records'
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <>
            <StyledButton variant="secondary" className="me-1" onClick={handleShow}><StyledIcon className="text-dark" /></StyledButton>
            <Modal show={show} onHide={handleClose} centered>
                {dataCheck ? <>
                    <Modal.Header>
                        <Modal.Title>Edit this job</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e) => handleSubmit(onSubmit(e))}>
                        <Modal.Body>

                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Job Description</Form.Label>
                                <Form.Control type="string" name="job_description" placeholder="job description" {...register("jobDescription")} defaultValue={data[0].job_description} />
                                {errors ? <p className="text-danger">{errors.jobDescription?.message}</p> : null}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Gross Pay</Form.Label>
                                <Form.Control type="number" min={0} step=".01" name="gross_pay" placeholder="gross income" {...register("grossPay")} defaultValue={data[0].gross_pay} />
                                {errors ? <p className="text-danger">{errors.grossPay?.message}</p> : null}
                            </Form.Group>

                            <Form.Group controlId="">
                                <Form.Label className="d-block">Date</Form.Label>
                                <Controller
                                    control={control}
                                    name="dateCreated"
                                    defaultValue={new Date(data[0].date_created)}
                                    render={({
                                        field: { onChange, onBlur, value },
                                        fieldState: { isTouched },
                                    }) => (
                                        <DatePicker onChange={onChange} onCalendarOpen={() => handleDate(isTouched)} value={value} onBlur={onBlur} calendarIcon={<BsCalendar3 />} className="d-block form-control" />
                                    )}
                                />
                            </Form.Group>

                            <hr className="my-5 w-75 mx-auto" />

                            <h5>Employer Details</h5>

                            {data.length > 0 && dataCheck ? (
                                <>
                                    <Form.Select aria-label="select" className="mb-3" disabled={employerCheck} {...register("employerSelect")} defaultValue={data[0].employer_name}>
                                        <option>{data[0].employer_name}</option>
                                        <hr className="bg-primary p-1 my-2" />
                                        {data[1].map((employer) => { return <option key={employer.employer_name} value={employer.employer_name}>{employer.employer_name}</option> }
                                        )}
                                    </Form.Select>
                                    {errors ? <p className="text-danger">{errors.employerSelect?.message}</p> : null}
                                </>
                            ) : null}

                            {data.length !== 0 && data.message !== "No employers found" ?
                                <Form.Check
                                    type="switch"
                                    id="employer-switch"
                                    label="Add new employer"
                                    className="mb-3"
                                    value={employerCheck}
                                    onChange={() => setEmployerCheck(!employerCheck)}
                                /> : null}

                            {employerCheck === true || data.message === "No employers found" ? <>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control type="string" name="employer_name" placeholder="employer name" {...register("employerName")} />
                                    {errors ? <p className="text-danger">{errors.employerName?.message}</p> : null}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control type="string" name="employer_line_1" placeholder="line 1" {...register("employerLine1")} />
                                    {errors ? <p className="text-danger">{errors.employerLine1?.message}</p> : null}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control type="string" name="employer_line_2" placeholder="line 2" {...register("employerLine2")} />
                                    {errors ? <p className="text-danger">{errors.employerLine2?.message}</p> : null}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control type="string" name="employer_town" placeholder="town" {...register("employerTown")} />
                                    {errors ? <p className="text-danger">{errors.employerTown?.message}</p> : null}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control type="string" name="employer_region" placeholder="region" {...register("employerRegion")} />
                                    {errors ? <p className="text-danger">{errors.employerRegion?.message}</p> : null}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Control type="string" name="employer_country" placeholder="country" {...register("employerCountry")} />
                                    {errors ? <p className="text-danger">{errors.employerCountry?.message}</p> : null}
                                </Form.Group></> : null}
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
                </> : <h2>Something went wrong.</h2>}
            </Modal>
        </>

    )
}
