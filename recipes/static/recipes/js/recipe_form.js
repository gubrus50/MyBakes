function createEmptyCategoryObject() {
	var categories_count = $('.recipe-category').length;
	if (categories_count >= categories_max_num) {
		updateCreateCategoryBtn(); return;
	}

	var delete_label = "Delete";
	if (recipe_id) { category_value = 'value="'+recipe_id+'"' }
	else { category_value = '' }

	$("#ingredients-form").append('\
		<div class="recipe-category">\
		  <div id="div_id_category_set-'+categories_count+'-name" class="form-group">\
		    <label for="id_category_set-'+categories_count+'-name" class="mb-1">'+categories_name_label+'</label>\
		    <div class="">\
		      <input type="text" name="category_set-'+categories_count+'-name" maxlength="100" class="textinput textInput form-control" id="id_category_set-'+categories_count+'-name">\
		    </div>\
		  </div>\
		  <div id="div_id_category_set-'+categories_count+'-ingredients" class="form-group">\
		    <label for="id_category_set-'+categories_count+'-ingredients" class=" requiredField mb-1 mt-3">'+categories_ingredients_label+'</label>\
		    <div class="">\
		      <textarea name="category_set-'+categories_count+'-ingredients" cols="40" rows="10" maxlength="500" class="textarea form-control custom-scroll empty-h-scroll" id="id_category_set-'+categories_count+'-ingredients"></textarea>\
		    </div>\
		  </div>\
		  <input type="hidden" name="category_set-'+categories_count+'-id" id="id_category_set-'+categories_count+'-id">\
		  <div class="form-group mt-3">\
		    <div id="div_id_category_set-'+categories_count+'-DELETE" class="form-check">\
		      <input type="checkbox" name="category_set-'+categories_count+'-DELETE" class="checkboxinput form-check-input" id="id_category_set-'+categories_count+'-DELETE">\
		        <label for="id_category_set-'+categories_count+'-DELETE" class="form-check-label">'+delete_label+'</label>\
		      </div>\
		    </div>\
		    <input type="hidden" name="category_set-'+categories_count+'-recipe" '+recipe_id+' id="id_category_set-'+categories_count+'-recipe">\
		  </div>\
		</div>\
	')
}



/* Determine if #create-category-btn should be disabled */
function updateCreateCategoryBtn()
{
	var categories_count = $('.recipe-category').length;
	var btn = $("#create-category-btn");

	if (categories_count >= categories_max_num) {
		btn.prop('disabled', true)
	} else { 
		btn.prop('disabled', false)
	}
}



function setYearAndFullnameAtLicense(year, fullname)
{
	$('#id_license')
	.val(
		$('#id_license')
			.val()
			.replace(/\[year\]/g, year)
			.replace(/\[fullname\]/g, fullname)
	)
}



function embedableVideoGuide()
{
	const vidGuide        = document.querySelector(".video-guide-container");
	const input_vidGuide  = vidGuide.querySelector("input#id_video_guide");
	const iframe_vidGuide = vidGuide.querySelector("iframe#video_guide");

	class LoadingSnippet {
		constructor(container) {
			this.container = container.querySelector(".loading-snippet");
			this.message = container.querySelector(".loading-snippet-message");
			this.originalMessage = this.message.innerHTML;
		}
		
		// Any additional methods can be added here
		updateMessage(newMessage) {
			this.message.innerHTML = newMessage;
		}

		resetMessage() {
			this.message.innerHTML = this.originalMessage;
		}
	}


	const loadingSnippet = new LoadingSnippet(vidGuide);
	let updateIframe;

	const extractVideoId = (url) => {
		let videoId = null;

		// Check for YouTube URL formats
		if (url.includes("youtube.com/embed/")) {
			// Extract video ID from embed URL
			videoId = url.split("embed/")[1].split('?')[0];
		}
		else if (url.includes("youtube.com/watch")) {
			// Extract video ID from standard YouTube URL
			let params = new URLSearchParams(url.split('?')[1]);
			videoId = params.get('v');
		}
		else if (url.includes("youtu.be/")) {
			// Extract video ID from shortened YouTube URL
			videoId = url.split("youtu.be/")[1].split('?')[0];
		}

		return videoId;
	};


	const testForIframe = () => {

		loadingSnippet.resetMessage();

		// Hide iframe initially and display loadingSnippet
		iframe_vidGuide.classList.add("d-none");
		loadingSnippet.container.classList.remove("d-none");

		if (input_vidGuide.value.trim() === "") {
			loadingSnippet.container.classList.add("d-none");
		}

		if (updateIframe) {
			clearTimeout(updateIframe);
		}

		updateIframe = setTimeout(() => {
		let videoId = extractVideoId(input_vidGuide.value);
		if (videoId) {
			iframe_vidGuide.setAttribute("src", `https://www.youtube.com/embed/${videoId}`);
			iframe_vidGuide.classList.remove("d-none");
			loadingSnippet.container.classList.add("d-none");
		} else {
			loadingSnippet.updateMessage("Invalid YouTube Video URL");
		}
		}, 3000);
	};


	input_vidGuide.onload = testForIframe();
	input_vidGuide.addEventListener("input", testForIframe);
}



window.onload = function() 
{
	$('#id_published').removeAttr('checked');

	$('.recipe-category').each(function(index){
		var name = $('#id_category_set-'+index+'-name');
		var ingr = $('#id_category_set-'+index+'-ingredients');

		if (name.is(':empty') && ingr.is(':empty')) {
			$(this).remove();
		}
	});

	updateCreateCategoryBtn();
	setYearAndFullnameAtLicense(new Date().getFullYear(), user_fullname);
	embedableVideoGuide();
	$('textarea').addClass('custom-scroll empty-h-scroll');
}