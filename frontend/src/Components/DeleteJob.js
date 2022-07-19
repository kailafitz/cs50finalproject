import React, { useState } from 'react';
import axios from 'axios';
import useToken from './useToken';
import { Button, Modal } from 'react-bootstrap';
import { RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';

const StyledIcon = styled(RiDeleteBinLine)`
    width: 1.3rem;
    height: 1.3rem;
`

const StyledButton = styled(Button)`
    @media only screen and (min-width: 728px) {
        width: 45%;
    }    
`

export const DeleteJob = ({ id }) => {
    const { token } = useToken();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/records/delete/${id}`, {
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
            <StyledButton variant="danger" onClick={handleShow}><StyledIcon className="text-white" /></StyledButton>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Delete this job</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => onSubmit(e)}>
                    <Modal.Body>
                        Are you sure you wish to delete this record?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" type="submit" onClick={handleClose}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
