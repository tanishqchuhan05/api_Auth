import Swal from "sweetalert2";

const SweetAlert = {
  confirm: async (title = "Are you sure?", text = "You won’t be able to revert this!") => {
    return Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  },

  success: (message = "Success!", title = "Done") => {
    return Swal.fire({
      title,
      text: message,
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  },

  error: (message = "Something went wrong!", title = "Error") => {
    return Swal.fire({
      title,
      text: message,
      icon: "error",
      confirmButtonColor: "#d33",
    });
  },
};

export default SweetAlert;
