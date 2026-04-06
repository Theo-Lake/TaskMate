import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#4a875a', 
    paddingTop: 50, 
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30, 
    alignItems: 'center', 
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 40,
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 60,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
    paddingRight: 20, 
  },
  checkboxWrapper: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginRight: 12,
  },
  termsText: {
    flex: 1, 
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
  linkText: {
    color: '#427ebd', 
    fontWeight: 'bold',
  },
  button: {
    width: '60%',
    borderRadius: 25, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonContent: {
    paddingVertical: 8,
  }
});