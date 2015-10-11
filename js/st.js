function addFiles(files)
{
	$('#drop_zone').hide();

	$.each(files, function(i, file)
	{
		$('#list').append('<div class="file noselect col">' + file.name + '</div>')
	});

	/* Reset the form to make the 'change' event work with the same file */
	$('#file_form').trigger('reset');
	$(document).trigger('filesLoaded');
}
