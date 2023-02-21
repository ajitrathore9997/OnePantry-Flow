import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  export function toastEmmit(msg,type){
    if(type === 'success'){
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
    }
      else if(type=== 'error'){
          toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
      }
}