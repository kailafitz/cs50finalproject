import React from "react";

// Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const AddVerb = ({ userInput, onFormChange, onFormSubmit }) => {
    // Getting the value of input as it changes (when there is the event triggered, we get the value)
    const handleChange = (event) => {
        // console.log(event.target.value);
        onFormChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="w-50 mx-auto p-5">
                <Form.Group className="mb-3" controlId="verb">
                    <Form.Control type="text" value={userInput} onChange={handleChange} placeholder="Enter verb name" required />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}