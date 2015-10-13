var stepFiles = {};

function addFiles(files)
{
	$('#text').hide();
	$(window).off('click')
	$('body').css('cursor', 'default');

	$.each(files, function(i, file)
	{
		/* Ignore non-step files */
		if (!file.name.toLowerCase().match('.ste?p')) {
			console.log('Rejected file: ' + file.name);
			return true;
		}

		var reader = new FileReader();
		reader.onerror = function(e) { console.log(e.target.error + ': ' + file.name); }
		reader.onloadend = (function(i, f, o)
		{
			return function(e)
			{
				o[f.name] = {};
				o[f.name]['contents'] = e.target.result;

				//console.log('Added file: ' + file.name);
				$('#list').append('<div class="file noselect col" data-file="' + i + '">' + file.name + '</div>');

				$('#properties').append(
					'<form id="file' + i + '">' +
						'<input type="text" name="prefix" placeholder="PREFIX" maxlength="8">' +
						'<input type="text" name="suffix" placeholder="SUFFIX" maxlength="8">' +
						'<input type="button" id="presuf" value="Set"><br>' +
						'<input type="button" id="desaturate" value="Remove Colours">' +
						'<hr>' +
						'<input type="button" id="remove" value="Remove">' +
						'<input type="button" id="export" value="Export">' +
					'</form>'
				);
			};
		})(i, file, stepFiles);

		reader.readAsText(file);
	});

	/* Reset the form to make the 'change' event work with the same file */
	$('#file_form').trigger('reset');
}
