$(document).ready(function()
{
	$(window).on('click', function(event)
	{
		$('input:file').click();
	});

	/* Prevent the simulated click from propagating back to window */
	$('input:file').on('click', function(event)
	{
		event.stopPropagation();
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

		$('#text').css('border-style', 'solid');
	});

	$(window).on('dragleave', function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		$('#text').css('border-style', 'dotted');
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

	$('#list').on('click', '.file', function()
	{
		$('#properties form').hide();
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
		$('#title').text($(this).text());
		$('#file' + $(this).data('file')).show();
		$('#properties').show();
	});

	$('#properties').on('click', '#presuf', function(event)
	{
		console.log($(this).siblings());
		console.log($(this).siblings('input[name=prefix]').val());

		if ($(this).siblings('input[name=prefix]').val()) {
			$(this).siblings('input[name=prefix]').attr('placeholder', "PREFIX: " + $(this).siblings('input[name=prefix]').val());
		}
		else {
			$(this).siblings('input[name=prefix]').attr('placeholder', "PREFIX");
		}

		if ($(this).siblings('input[name=suffix]').val()) {
			$(this).siblings('input[name=suffix]').attr('placeholder', "SUFFIX: " + $(this).siblings('input[name=suffix]').val());
		}
		else {
			$(this).siblings('input[name=suffix]').attr('placeholder', "SUFFIX");
		}

		$(this).parent().trigger('reset');
	});

	$('#properties').on('click', '#desaturate', function()
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

	$('#properties').on('click', '#remove', function()
	{
		event.stopPropagation();

		$('.selected').remove();
		$('#properties').hide();

		if ($('.file').length == 0) {
			$(window).on('click', function(event)
			{
				$('input:file').click();
			});

			$('body').css('cursor', 'pointer');
			$('#text').show();
		}
	});
});
