import axios from "axios";
import React from "react";
import {  Navigate} from "react-router-dom"; 
// import { replace } from 'connected-react-router';
import { toastEmmit } from "../Helper/Toastr";
// import { refresh_token } from "./AuthApi";
// import { errorHandler } from "./ErrorHandler"; 

// let token = getAuthToken();
/*===============================================================
            Common get API
==================================================================*/

const Token = localStorage.getItem('token')
// console.log(Token , '----------token')


export const GetService = async (urlString, params) => {
// const navigate = useNavigate()

// console.log('getservice')

  if (urlString.includes("undefined")) {
    return;
  }
//  <Link to={'/login'} />

  // <redirect to='/login' />
  

//   if (!validateExpTimestamp()) {
//     await refresh_token();
//   }

const Token = localStorage.getItem('token')

  const AxiosConfig = {
    headers: {
      Accept: "application/json",
      Authorization: Token,
    },
    ...params,
  };
  // console.log({ Cheaders });
  const response = await axios
    .get(urlString, AxiosConfig)
    .catch((err) => {
    //   errorHandler(err);
      return err;
    });
  if (response?.response?.status === 401) {
    toastEmmit(response?.response?.data.message,'error')
    localStorage.removeItem('token');
    // <redirect to='/login' />
    // console.log("invalid");
    // refresh_token();
  }

  return response;
};

/*===============================================================
            Common Post API for JSON post
==================================================================*/
//  notify(`${err?.response?.status} Something went wrong`);
export const PostService = async (urlString, data) => {
  
  
//   if (!validateExpTimestamp()) {
//     // await refresh_token();
//   }
const Token = localStorage.getItem('token')
 
  let AxiosConfig = {
    headers: {
      content: "application/json",
      Authorization: Token
    },
  };
  
  // console.log('link')
  // const navigate = useNavigate();
  // console.log('link')
  // navigate('/login')
  const response = await axios
    .post( urlString, data, AxiosConfig)
    .catch((err) => {
      console.log(err);
      // notify(
      //   `Error : ${err?.response?.status} ${
      //     err?.response?.data?.error?.desc || err?.response?.data
      //   }`
      // );
    //   errorHandler(err);
      return err;
    });
  if (response?.response?.status === 401) {
    toastEmmit(response?.response?.data.message,'error')
    // refresh_token();
    localStorage.removeItem('token');  
    <Navigate to="/login" />
    // <Navigate to={'/login'}></Navigate>
    // redirect('/login')
    console.log('link')
  }
  return response;
};

/*===============================================================
            Common Post API for FormData post
==================================================================*/

export const postFormData = async (urlString, data) => {
//   if (!validateExpTimestamp()) {
//     // await refresh_token();
//   }

  let AxiosConfig = {
    headers: {
      mimeType: "multipart/form-data",
      Authorization: Token,
    },
  };
  const response = await axios
    .post( urlString, data, AxiosConfig)
    .catch((err) => {
      // notify(`Error : ${err?.response?.status} ${err?.response?.statusText}`);
    //   errorHandler(err);
      return err;
    });
  if (response?.response?.status === 401) {
    // refresh_token();
    localStorage.removeItem('token');
    // <redirect to='/login' />
  }
  return response;
};

// export const putService = async (urlString, data, headers, params) => {
//   // console.log(urlString);

//   if (!validateExpTimestamp()) {
//     // await refresh_token();
//   }

//   const AxiosConfig = {
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + getAuthToken(),
//     },
//     ...params,
//   };

//   const response = await axios
//     .put(url + urlString, data, AxiosConfig)
//     .catch((err) => {
//       // notify(`Error : ${err?.response?.status} ${err?.response?.statusText}`);
//       errorHandler(err);
//       return err;
//     });
//   if (response?.response?.status === 401) {
//     // refresh_token();
//   }
//   return response;
// };

// export const putFormData = async (urlString, data, headers, params) => {
//   // console.log(urlString);

//   if (!validateExpTimestamp()) {
//     // await refresh_token();
//   }

//   const AxiosConfig = {
//     headers: {
//       // mimeType: "multipart/form-data",
//       Authorization: "Bearer " + getAuthToken(),
//     },
//     ...params,
//   };

//   const response = await axios
//     .put(url + urlString, data, AxiosConfig)
//     .catch((err) => {
//       // notify(`Error : ${err?.response?.status} ${err?.response?.statusText}`);
//       errorHandler(err);
//       return err;
//     });
//   if (response?.response?.status === 401) {
//     // refresh_token();
//   }
//   return response;
// };

// export const deleteService = async (urlString, data, headers, params) => {
//   // console.log(data);

//   if (!validateExpTimestamp()) {
//     // await refresh_token();
//   }

//   const AxiosConfig = {
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + getAuthToken(),
//     },
//     ...params,
//   };

//   const response = await axios
//     .delete(url + urlString, AxiosConfig)
//     .catch((err) => {
//       // notify(`Error : ${err?.response?.status} ${err?.response?.statusText}`);
//       errorHandler(err);
//       return err;
//     });
//   if (response?.response?.status === 401) {
//     // refresh_token();
//   }
//   return response;
// };