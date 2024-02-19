// "use client"; // This is a client component
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import authService from '@/api/axios'; // Import the authService
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const token = await authService.login(email, password);
//       console.log('Login successful! Token:', token);

//        navigate('/');
//       // Handle navigation or state update after successful login
//     } catch (error: any) {
//       toast.error(error || 'Login failed. Please check your credentials.', {
//         position: 'top-center',
//       });
//     }
//   };

//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img className="mx-auto h-10 w-auto" src="f3.png" alt="Your Company" />
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form className="space-y-6" onSubmit={handleLogin}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center justify-between">
//               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                 Password
//               </label>
//               <div className="text-sm">
//                 <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                   Forgot password?
//                 </a>
//               </div>
//             </div>
//             <div className="mt-2">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         <p className="mt-10 text-center text-sm text-gray-500">
//           Don&apos;t have an account?
//           <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create Account</Link>
//         </p>

//         <ToastContainer />
//       </div>
//     </div>
//   );
// }

// export default Login;
