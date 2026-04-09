import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {Checkbox, Button} from 'react-native-paper';
import {styles} from './styles';
import Logo from '../../assets/img/logoNoText.png';
import CustomHeader from '../../components/navBar/CustomHeader';

const EmailConfirmationScreen = ({navigation}:any) => {
  const [code, setCode] = useState<string>('');
  const [isTickboxChecked, setIsTickboxChecked] = useState<boolean>(false);

  return(
    <View style={styles.container}>
      
      <CustomHeader title="Sign Up" navigation={navigation} showBackArrow={true} showProfilePicture={false}/>
      

      <View style={styles.content}>
        
        <Image source={Logo} style={styles.logo} resizeMode="contain"/>

        <Text style={styles.instuuctionText}> The confirmation code has been sent to your email.
        </Text>

        <TextInput style={styles.input} placeholder="Code" placeholderTextColor="#888" value={code} onChangeText={setCode} keyboardType="number-pad" />

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxWrapper}>
            <Checkbox.Android
              status={isTickboxChecked ? 'checked' : 'unchecked'}
              onPress={() => setIsTickboxChecked(!isTickboxChecked)}
              color="#3b824a" 
            />
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkText}>Terms and Conditions</Text> and have reviewed the <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>

        <Button icon="account-outline" mode="contained" onPress={() => console.log('Sign Up button clicked by user.')} style={styles.button} contentStyle={styles.buttonContent} buttonColor="#3b824a">Sign Up</Button>

      </View>
    </View>
  );
};

export default EmailConfirmationScreen;