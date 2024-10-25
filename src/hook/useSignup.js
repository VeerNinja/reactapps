// src/useSignup.js
// import { useMutation } from '@tanstack/react-query';
// import { signupUser } from '../services/authService'; // Ensure the path is correct

// const useSignup = () => {
//     return useMutation(signupUser, {
//         onSuccess: () => {
//             alert('Signup successful!');
//         },
//         onError: (error) => {
//             alert(error.message);
//         },
//     });
// };

// export default useSignup;


// src/hook/useSignup.js
import { useMutation } from 'react-query';
import { signup } from '../services/apiService';

const useSignup = () => {
  return useMutation(signup);
};

export default useSignup;


