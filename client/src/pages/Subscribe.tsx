import axios from "axios"
import { useContext, useState } from "react"
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap"
import { toast } from "react-hot-toast"


const Subscribe = () => {


    const [email, setEmail] = useState('')
const subscribeHandler = async (e: any) =>{
    e.preventDefault()
    try {
        const res = await axios.post('/subscriber', {
            email
            })   
            toast.success('subscribed successfully')
            setEmail("")
    } catch (error) {
        toast.error((error as any).response.data)
    }


}
   

    return ( 
        
        <>
            {/* login */}



            <Form onSubmit={subscribeHandler}>  
                <Row style={{
                    height: "80vh",
                    justifyContent: "center",
                    paddingTop: "3%"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            
                            <Form.Control value={email} type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                            {/* <Form.Control type="password" placeholder="password" onChange={((e) => updateLoginInfo({ ...loginInfo, password: e.target.value }))} /> */}
                            <Button variant="primary" type="submit">{ false ? "Loading..." : "Subscribe"}</Button>

                    {/* {loginError?.error && (
                        <Alert variant="danger"><p>{loginError?.message}</p></Alert>
                    )} */}
    

                            
                        </Stack>
                    </Col>
                </Row>
            </Form>

            <h4>or</h4>

            {/* login subscriber */}
        

            
            



{/* register */}


</>
    )
}

export default Subscribe