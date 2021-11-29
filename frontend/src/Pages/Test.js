import React, { useState, useEffect } from "react";

// Packages
import axios from "axios";

// Bootstrap components
import Container from "react-bootstrap/Container";

export const Test = () => {
    // Connect frontend to backend
    // import useState, useEffect
    // React hook
    const [test, setTest] = useState([]) // empty array

    // Fetch data and console log to verify connection
    // useEffect(() => {
    //     fetch("/api").then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //     }).then(data => console.log(data))
    // }, [])
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api")
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
    }, [])

    return (
        <Container className="p-4">
            <h2 className="text-primary">Test Page</h2>
        </Container>
    )
}