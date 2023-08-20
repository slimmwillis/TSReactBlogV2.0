import axios from "axios"
import { useContext, useState } from "react"
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap"
import { toast } from "react-hot-toast"



const Subscribe = () => {

    const [loading, setLoading] = useState(false); // Define the loading state
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
   

const deleteSubscriber = async () => {

    if (!email) {
        toast.error("Please provide an email to delete.");
        return;
      }
  
    try {
      setLoading(true);
      // Add your delete subscribers logic here using an axios request
      await axios.post("/deleteSubscriber", { emailToDelete: email });
      setLoading(false);
      toast.success("Subscribers deleted successfully");
      setEmail("");
    } catch (error) {
      setLoading(false);
      toast.error("Error deleting subscriber");
    }
  };

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

                            <Button
        variant="danger"
        onClick={deleteSubscriber}
        disabled={loading}
        style={{ marginLeft: "1rem" }}
      >
        {loading ? "Deleting..." : "Delete Subscriber"}
      </Button>

                    {/* {loginError?.error && (
                        <Alert variant="danger"><p>{loginError?.message}</p></Alert>
                    )} */}
    

                            
                        </Stack>
                    </Col>
                </Row>
            </Form>

            {/* <h4>or</h4> */}

            {/* login subscriber */}
        

            
            



{/* register */}


</>
    )
}

export default Subscribe