$(document).ready(function()
{
	$('#drop_zone').on('click', function()
	{
		$('input:file').click();
	});

	$(window).on('dragover', function(event)
	{
		event.stopPropagation();
		event.preventDefault();
	});

	$(window).on('dragenter', function(event)
	{
		event.stopPropagation();
		event.preventDefault();
	});


	$(window).on('drop', function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		addFiles(event.originalEvent.dataTransfer.files);
	});

	$('input:file').on('change', function(event)
	{
		addFiles(event.target.files);
	});
});

$(document).on('filesLoaded', function()
{
	$('.file').on('click', function()
	{
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
		$('#title').text($(this).text());
		$('#properties').show();
	});

	$('#presuf').on('click', function(event)
	{
		if ($('input[name=prefix]').val()) {
			$('input[name=prefix]').attr('placeholder', "PREFIX: " + $('input[name=prefix]').val());
		}
		else {
			$('input[name=prefix]').attr('placeholder', "PREFIX");
		}

		if ($('input[name=suffix]').val()) {
			$('input[name=suffix]').attr('placeholder', "SUFFIX: " + $('input[name=suffix]').val());
		}
		else {
			$('input[name=suffix]').attr('placeholder', "SUFFIX");
		}

		$('#properties form').trigger('reset');
	});

	$('#desaturate').on('click', function()
	{
		if ($('.selected').hasClass('col')) {
			$('.selected').removeClass('col');
			$('.selected').addClass('bw');
			$(this).val('Keep Colours');
		}
		else {
			$('.selected').removeClass('bw');
			$('.selected').addClass('col');
			$(this).val('Remove Colours');
		}
	});

	$('#remove').on('click', function()
	{
		$('.selected').remove();
		$('#properties').hide();
		$('#desaturate').val('Remove Colours');

		if ($('.file').length == 0) {
			$('#drop_zone').show();
		}
	});
});
