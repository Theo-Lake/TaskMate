import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {Checkbox, Button} from 'react-native-paper';
import {styles} from './styles';
import Logo from '../../../assets/img/logoNoText.png';
import CustomHeader from '../../components/navBar/CustomHeader';
import { useVerifyEmail } from '../../hooks/useAuth';
import { EmailVerificcationSchema } from '../../validation/schemas/emailCode';
//Don't forget to change keyboard type
const EmailConfirmationScreen = ({navigation,route}:any) => {
  const [code, setCode] = useState<string>('');
  const [isTickboxChecked, setIsTickboxChecked] = useState<boolean>(false);
  const {userID} = route.params || {};
  const {mutate:verifyEmailMutation, isPending} = useVerifyEmail();
  //MIght be used for saving error:
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const deleteOldError=(text:string)=>{
    setCode(text);
    if (errorMsg) setErrorMsg(null);
  }
  const handleEvmailConformation = () => {
    setErrorMsg(null);
    const  trimmedCode = code.trim().toLowerCase()
    console.log("DATA TO SEND:", { 
      userId: Number(userID), 
      token: trimmedCode 
  });

    const validationPassed = EmailVerificcationSchema.safeParse({
      token: trimmedCode,
      userId: Number(userID),
    });


    if (!validationPassed.success){
      setErrorMsg(validationPassed.error.errors[0].message);
      return;
    }
    verifyEmailMutation(
      {userId:Number(userID), token:trimmedCode},
      {
        onSuccess: () => {
          navigation.navigate('MainApp');

        },
        onError:(error:any)=>{
          const backendError = error.response?.data?.error || "Invalid  code.";
          setErrorMsg(backendError);
        }
      }
    )
  }
  const isDissabledButton = !isTickboxChecked || code.trim().length !== 8 || isPending;
  return(
    <View style={styles.container}>
      
      <CustomHeader title="Sign Up" navigation={navigation} showBackArrow={false} showProfilePicture={false}/>
      

      <View style={styles.content}>
        
        <Image source={Logo} style={styles.logo} resizeMode="contain"/>

        <Text style={styles.instuuctionText}> The confirmation code has been sent to your email.
        </Text>

        <TextInput style={[styles.input, errorMsg?{borderColor: '#d32f2f'}:null]} placeholder="Code" placeholderTextColor="#888" value={code} onChangeText={deleteOldError} keyboardType="default" />

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxWrapper}>
            <Checkbox.Android
              status={isTickboxChecked ? 'checked' : 'unchecked'}
              onPress={() =>{
                 setIsTickboxChecked(!isTickboxChecked);
                if (errorMsg) setErrorMsg(null);
              }}
              color="#3b824a" 
            />
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkText}>Terms and Conditions</Text> and have reviewed the <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
        <View style={{height:24, marginBottom:8}}>
          {errorMsg &&(
            <Text style={styles.errorText}>
              {errorMsg}
            </Text>
          )}
        </View>
        <Button icon="account-outline" mode="contained" onPress={handleEvmailConformation} style={styles.button} contentStyle={styles.buttonContent} buttonColor="#3b824a" disabled={isDissabledButton} loading={isPending}>Sign Up</Button>

      </View>
    </View>
  );
};

export default EmailConfirmationScreen;