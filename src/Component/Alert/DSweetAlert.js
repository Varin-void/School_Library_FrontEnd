import Swal from 'sweetalert2';

export const DSweetAlert = {
    ShowConfirm: (Content,Then) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            // text: "You won't be able to delete this!",
            text: Content,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes!",
            cancelButtonText: "No!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                Then();
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Process has been Cancelled",
                    icon: "error"
                });
            }
        });
    },
    ShowError: (Content) => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: Content,
        });
    },
    ShowSuccess: async (Content, Then) => {
        await Swal.fire({
            title: "Success!",
            text: Content,
            icon: "success"
        });
        if (Then !== undefined) {
            Then();
        }
    }
}
