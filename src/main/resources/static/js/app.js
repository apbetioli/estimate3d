
$(function () {
    $(document).on('change', ':file', function () {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $(document).ready(function () {
        $(':file').on('fileselect', function (event, numFiles, label) {

            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

            if (input.length) {
                input.val(log);
            } else {
                if (log) alert(log);
            }

        });
        $('.loading').hide();
    });

    $('#filament_density').on('change', function (e) {
    });

    $('#slicer').on('change', function (e) {
    });

    $("select").select2({
        dropdownCssClass: 'dropdown-inverse'
    });
});

$(window).bind("pageshow", function(event) {
    $('.loading').hide();
});

if (performance.navigation.type == 2) {
    $('#filament_density').val(localStorage.material);
    $('#slicer').val(localStorage.slicer );
}

$('#estimate').submit(function() {
    localStorage.material = $('#filament_density').val();
    localStorage.slicer = $('#slicer').val();
    $(".loading").show();
});