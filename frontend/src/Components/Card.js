import React from "react";

// Bootstrap component
import Card from "react-bootstrap/Card";

export const Card = () => {
    return (
        <>
            {
                listOfVerbs ?
                    listOfVerbs.map(verb => {
                        return (
                            <Card>
                                <Card.Body>
                                    <Card.Title>[Verb Name]</Card.Title>
                                    <Card.Text>[Translation]
                                    </Card.Text>
                                    <Button variant="primary">View</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                    : null
            }
        </>
    )
}
