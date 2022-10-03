import React, { useState } from 'react'
import { Grid, TextField, Typography, Box, Paper, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { auth, firebase } from '../../firebase';
const Login = () => {
    const navigate = useNavigate()
    const [mynumber, setnumber] = useState("");
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
    // Sent OTP
    const signin = () => {
        if (mynumber === "" || mynumber.length < 10) return;
        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber("+91" + mynumber, verify).then((result) => {
            setfinal(result);
            alert("Code Sent Succesfully !!")
            setshow(true);
        })
            .catch((err) => {
                console.log('err', err);
            });
    }

    // Validate OTP
    const ValidateOtp = () => {
        if (otp === null || final === null)
            return;
        final.confirm(otp).then((result) => {
            // console.log(result)
            if(result.additionalUserInfo.isNewUser === true){
                const userInfo = {
                    "user_id": result.user.uid,
                    "phoneNumber": result.user.phoneNumber
                }
                console.log({"Status": true, "Message": "Register Succesfully !!", "UserInfo": userInfo});
                navigate('/admin-dashboard')
            }else if(result.additionalUserInfo.isNewUser === false){
                const userInfo = {
                    "user_id": result.user.uid,
                    "phoneNumber": result.user.phoneNumber
                }
                console.log({"Status": true, "Message": "Login Succesfully !!", "UserInfo": userInfo});
                navigate('/admin-dashboard')
            }else{
                console.log("Something Went Wrong!!")
            }
        }).catch((err) => {
            alert("Code is Expire Now !!");
        })
    }


    return (
        <Box my={4}>
            <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
                <Grid item xs={11} sm={6} md={4}>
                    <Typography variant="h5" component="div" textAlign='center' mt={3}>
                        Login
                    </Typography>
                    <Box p={2}>
                        <Grid item xs={12}>
                            {
                                show ?
                                    <TextField
                                        fullWidth
                                        label="Enter your OTP"
                                        id="outlined-size-small"
                                        size="small"
                                        name='otp'
                                        value={otp}
                                        onChange={(e) => { setotp(e.target.value) }}
                                    />
                                    :
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            id="outlined-size-small"
                                            size="small"
                                            name='phone'
                                            value={mynumber}
                                            onChange={(e) => {
                                                setnumber(e.target.value)
                                            }}
                                        />
                                        <div id="recaptcha-container"></div>
                                    </>

                            }
                        </Grid>
                        {
                            show ?
                                <Grid item xs={12} mt={2}>
                                    <Button variant="contained" onClick={() => ValidateOtp()}>Verify</Button>
                                </Grid>
                                :
                                <Grid item xs={12} mt={2}>
                                    <Button variant="contained" onClick={() => signin()}>Login</Button>
                                </Grid>

                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login