


const dataTable = () => {

    import("./../../plugins/datatables-bs4/css/dataTables.bootstrap4.min.css")
    import("./../../plugins/datatables-bs4/css/dataTables.bootstrap4.min.css")
    import("./../../plugins/datatables-responsive/css/responsive.bootstrap4.min.css")
    import("./../../plugins/datatables-buttons/css/buttons.bootstrap4.min.css")
    import("./../../plugins/datatables-buttons/css/buttons.bootstrap4.min.css")
    
    import("./../../plugins/datatables/jquery.dataTables.min.js")
    import("./../../plugins/datatables-bs4/js/dataTables.bootstrap4.min.js")
    import("./../../plugins/datatables-responsive/js/dataTables.responsive.min.js")
    import("./../../plugins/datatables-responsive/js/responsive.bootstrap4.min.js")
    import("./../../plugins/datatables-buttons/js/dataTables.buttons.min.js")
    import("./../../plugins/datatables-buttons/js/buttons.bootstrap4.min.js")
    import("./../../plugins/jszip/jszip.min.js")
    import("./../../plugins/pdfmake/pdfmake.min.js")
    import("./../../plugins/pdfmake/vfs_fonts.js")
    import("./../../plugins/datatables-buttons/js/buttons.html5.min.js")
    import("./../../plugins/datatables-buttons/js/buttons.print.min.js")
    import("./../../plugins/datatables-buttons/js/buttons.colVis.min.js")

$(function () {
    $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

});

}

export default dataTable;