import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useToken from '../components/useToken';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ErrorMessage } from '../components/ErrorMessage';

const loginSchema = yup.object({
    username: yup.string().required('This is required'),
    password: yup.string().required('This is required'),
}).required();

export const Login = () => {
    const { setToken } = useToken();
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (e) => {
        // try {
        //     e.preventDefault();
        //     const username = e.target[0].value;
        //     const password = e.target[1].value;
        //     let response = await axios({
        //         method: 'post',
        //         url: 'http://localhost:5000/login',
        //         data: { "username": username, "password": password },
        //     })

        //     setToken(response.data.access_token)
        //     window.location.href = 'http://localhost:3000/'
        // }
        // catch (e) {
        //     let string = '';
        //     string = e.response.data.message;
        //     setErrorMessage(string);
        // }
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        axios.post("http://localhost:5000/login", { "username": username, "password": password }).then(response => {
            setToken(response.data.access_token)
            window.location.href = 'http://localhost:3000/records'
        }).catch((e) => {
            let string = '';
            string = e.response.data.message;
            setErrorMessage(string);
        })
    }

    console.log(errors);

    return (
        <Container className="d-flex flex-column justify-content-center flex-grow-1">
            <Row className="justify-content-center">
                <Col xs={12} className="mb-4 text-center">
                    <h1>Login</h1>
                    <h6>Get back in there</h6>
                </Col>
                <Col xs={8} md={5} lg={3}>
                    <form onSubmit={(e) => handleSubmit(onSubmit(e))}>
                        <Form.Group className="mb-3" controlId="loginUsername">
                            <Form.Control type="text" placeholder="username" name="username" {...register("username")} />
                            {errors ? <p className="text-danger">{errors.username?.message}</p> : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Control type="text" placeholder="password" name="password" {...register("password")} />
                            {errors ? <p className="text-danger">{errors.password?.message}</p> : null}
                        </Form.Group>
                        {errorMessage ?
                            <ErrorMessage message={errorMessage} /> : null}
                        <Button type="submit" className="w-100">Login</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}
