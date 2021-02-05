import React, { useState } from 'react'
import { Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import { FaSearchLocation } from 'react-icons/fa'
import API from "../utils/API"

export default function Search() {

    // ZOMATO API CALL
    const [food, setFood] = useState([])
    function loadRestaurants() {
        API.getRestaurants()
          .then(res => 
            setFood(res.data)
          )};
      loadRestaurants();
        console.log(food);

    return (
        <>
            <Container>
            <Card>
                <Card.Header>
                    <h2 className="w-100 text-center mt-2">Search for local food & entertainment</h2>
                </Card.Header>
                <Card.Body>
                <InputGroup className="mb-3">
                <FormControl
                placeholder="Tacos"
                />
                <InputGroup.Append>
                <Button variant="secondary"><FaSearchLocation /></Button>
                </InputGroup.Append>
                </InputGroup>
                </Card.Body>


            </Card>

            <Card className="mt-2 p-3">
                <p>Search results populate here</p>
            </Card>
            </Container>

        </>
    )
}
