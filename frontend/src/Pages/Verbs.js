import React from "react";

// My components
import { AddVerb } from "../Components/AddVerb";

// Bootstrap components
import Container from "react-bootstrap/Container";

export const Verbs = () => {
    return (
        <Container className="p-3">
            <h2 className="display-2 d-block text-center py-3">Verbs</h2>
            <AddVerb />
        </Container>
    )
}