let channelSlug = 'gossip-4rjknshdafi' // The “slug” is just the end of the URL.
let myUsername = 'ali-salifov' // For linking to your profile.

// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (channelData) => {
	// Target some elements in your HTML:
	let channelTitle = document.querySelector('#channel-title')
	let channelDescription = document.querySelector('#channel-description')
	let channelCount = document.querySelector('#channel-count')
	let channelLink = document.querySelector('#channel-link')

	// Then set their content/attributes to our data:
	// channelTitle.innerHTML = channelData.title
	// channelDescription.innerHTML = channelData.description.html
	// channelCount.innerHTML = channelData.counts.blocks
	// channelLink.href = `https://www.are.na/channel/${channelSlug}`
}

// Then our big function for specific-block-type rendering:
let renderBlock = (blockData) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.querySelector('#channel-blocks')

	// Links!
	if (blockData.type == 'Link') {
		// Declares a “template literal” of the dynamic HTML we want.
		let linkItem =
		// the setup here is basically a list element that contains the thumbnail with a preview image and a dialog that contains full content of the link and a section for the close and share buttons, the other blocks follow the same pattern. im also adding a data attribute to the dialog to store the share url for the share button
			`
			<li class="link-block">
				<button type="button" class="link-button">
					<img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }">
				</button>
				<dialog data-share-url="${blockData.source.url}">
					<a href="${blockData.source.url}"><img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }" class="thumbnail"></a>
					<section class="dialog-buttons">
						<button type="button" class="dialog-close">
							<img src="assets/button.svg" alt="Close">
							<p>Close</p>
						</button>
						<button type="button" class="dialog-share">
							<img src="assets/button.svg" alt="Share">
							<p>Share</p>
						</button>
					</section>
				</dialog>
			</li>
			`

		// And puts it into the page!
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)

		// More on template literals:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	}

	// Images!
	else if (blockData.type == 'Image') {
		// …up to you!
		let imageItem =
			`
			<li class="image-block">
				<button type="button" class="image-button">
					<img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }" class="image-thumbnail">
				</button>
				<dialog data-share-url="${blockData.image.large.src_2x}">
					<section class="dialog-container">
						<img src="${blockData.image.large.src_2x}">
						<section class="dialog-buttons">
							<button type="button" class="dialog-close">
								<img src="assets/button.svg" alt="Close">
								<p>Close</p>
							</button>
							<button type="button" class="dialog-share">
								<img src="assets/button.svg" alt="Share">
								<p>Share</p>
							</button>
						</section>
					</section>
				</dialog>
			</li>
			`

		// puts it into the page!
		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
	}

	// Text!
	else if (blockData.type == 'Text') {
		// …up to you!
		let textItem =
			`
			<li class="text-block">
				<button type="button" class="text-button">
					<img src="assets/text-button.svg" alt="Read Text">
				</button>
				<dialog data-share-url="https://www.are.na/block/${blockData.id}">
					<section class="dialog-container">
						${blockData.content.html}
						<section class="dialog-buttons">
							<button type="button" class="dialog-close">
								<img src="assets/button.svg" alt="Close">
								<p>Close</p>
							</button>
							<button type="button" class="dialog-share">
								<img src="assets/button.svg" alt="Share">
								<p>Share</p>
							</button>
						</section>
					</section>
				</dialog>
			</li>
			`

		// puts it into the page!
		// console.log(`${blockData.content.html}`); testing
		channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}

	// Uploaded (not linked) media…
	else if (blockData.type == 'Attachment') {
		let contentType = blockData.attachment.content_type // Save us some repetition.

		// Uploaded videos!
		if (contentType.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li class="video-block">
					<button type="button" class="video-button">
						<img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }">
					</button>
					<dialog data-share-url="${blockData.attachment.url}">
						<video controls src="${blockData.attachment.url}"></video>
						<button class="close"></button>
					</dialog>
				</li>
				`

			channelBlocks.insertAdjacentHTML('beforeend', videoItem)

			// More on `video`, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (contentType.includes('pdf')) {
			// …up to you!
			let pdfItem =
				`
				<li class="pdf-block">
					<button type="button" class="pdf-button">
						<img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }">
					</button>
					<dialog data-share-url="${blockData.attachment.url}">
						<iframe src="${blockData.attachment.url}"></iframe>
						<button class="close"></button>
					</dialog>
				</li>
				`

				channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
		}

		// Uploaded audio!
		else if (contentType.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li class="audio-block">
					<button type="button" class="audio-button">
						<img src="assets/audio-button.svg" alt="Play Audio">
					</button>
					<dialog data-share-url="${blockData.attachment.url}">
						<section class="dialog-container">
							<audio controls src="${blockData.attachment.url}"></audio>
							<section class="dialog-buttons">
								<button type="button" class="dialog-close">
									<img src="assets/button.svg" alt="Close">
									<p>Close</p>
								</button>
								<button type="button" class="dialog-share">
									<img src="assets/button.svg" alt="Share">
									<p>Share</p>
								</button>
							</section>
						</section>
					</dialog>
				</li>
				`

			channelBlocks.insertAdjacentHTML('beforeend', audioItem)

			// More on`audio`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked (embedded) media…
	else if (blockData.type == 'Embed') {
		let embedType = blockData.embed.type

		// Linked video! (Youtube)
		if (embedType.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			// changed it to an image thumbnail of the video
			let linkedVideoItem =
				`
				<li class="video-block">
					<button type="button" class="video-button">
						<img src="assets/play-button.svg" alt="Play Video" class="play-button">
						<img alt="${blockData.image.alt_text}" src="${ blockData.image.src }" class="video-thumbnail">
					</button>
					<dialog data-share-url="${blockData.source.url}">
						<section class="dialog-container">
							${ blockData.embed.html }
							<section class="dialog-buttons">
								<button type="button" class="dialog-close">
									<img src="assets/button.svg" alt="Close">
									<p>Close</p>
								</button>
								<button type="button" class="dialog-share">
									<img src="assets/button.svg" alt="Share">
									<p>Share</p>
								</button>
							</section>
						</section>
					</dialog>
				</li>
				`

			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)

			// More on `iframe`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}
	}
}

// A function to display the owner/collaborator info:
let renderUser = (userData) => {
	let channelUsers = document.querySelector('#channel-users') // Container.

	let userAddress =
		`
		<address>
			<h3>${ userData.name }</h3>
		</address>
		`

	channelUsers.insertAdjacentHTML('beforeend', userAddress)
}

/* function to enable modal opening and closing, from eric's example */
let initInteraction = () => {
	let blocks = document.querySelectorAll('.image-block, .text-block, .link-block, .pdf-block, .video-block, .audio-block')
	blocks.forEach((block) => {
		let openButton = block.querySelector('.image-button, .text-button, .link-button, .pdf-button, .video-button, .audio-button')
		let dialog = block.querySelector('dialog')
		let closeButton = dialog.querySelector('button')
		let shareButton = dialog.querySelector('.dialog-share')

		openButton.onclick = () => {
			dialog.showModal()
		}

		closeButton.onclick = () => {
			dialog.close()
		}

		/* adding an event listener to the share button to share the original content of the dialog */
		shareButton.onclick = () => shareContent(getURL(dialog))

		dialog.onclick = (event) => { // Listen on our `modal` also…
			if (event.target == dialog) { // Only if clicks are to itself (the background).
				dialog.close() // Close it then too.
			}
		}
	})
}

/* content filtering function to hide and unhide certain blocks */
let filterBlocks = (filter) => {
	/* selecting the main container and the blocks */
	let allBlocks = document.querySelector('#channel-blocks')
	let blocks = allBlocks.querySelectorAll('li')

	/* looping through the blocks */
	blocks.forEach((block) => {
		/* checking if the block is an image or a video */
		let allImages = block.classList.contains('image-block')
		let allVideos = block.classList.contains('video-block')

		/* setting the show variable to false */
		let show = false

		/* checking if the button clicked is all, images, videos, or others */
		if (filter === 'all') {
			show = true
		} else if (filter === 'images') {
			show = allImages
		} else if (filter === 'videos') {
			show = allVideos
		} else if (filter === 'others') {
			show = !allImages && !allVideos
		}

		/* toggling the hidden class */
		block.classList.toggle('hidden', !show)
	})
}

/* a function to change the position of the select button based on the button clicked */
let navAnimation = () => {
	/* targetting the selection green svg element */
	let selectedButton = document.querySelector('.nav-select')

	/* an array of the filter buttons and their ids */
	let filters = [
		['all', 'filter-all-button'],
		['images', 'filter-images-button'],
		['videos', 'filter-videos-button'],
		['others', 'filter-others-button']
	]

	/* looping through the filters */
	filters.forEach(([filter, id]) => {
		/* adding an event listener to the filter buttons */
		document.getElementById(id).addEventListener('click', () => {
			/* filtering the blocks */
			filterBlocks(filter)
			/* at first I tried moving the selection svg using px/rem values but because the nav items are in a flex container, it wasnt working so now im targetting the wrapper of the button clicked to insert the select button before it, im using the closest() method to target the parent element of the button clicked */
			let wrapper = document.getElementById(id).closest('.nav-filter-option')
			/* inserting the selection svg before the first child of the wrapper */
			if (wrapper) wrapper.insertBefore(selectedButton, wrapper.firstChild)
		})
	})
}

/* a function to get the share url from the dialog data attribute */
let getURL = (dialog) => {
	/* using getAttribute() to get the data-share-url attribute from the dialog, from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute */
	return dialog.getAttribute('data-share-url')
}

/* a function to share the content of the dialog
here im using the navigator.share() method to share the content of the dialog, from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
im basically passing the url and title to the share() method, from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share */
let shareContent = async (url = window.location.href, title = document.title) => {
	/* in order for navigator.share() to work I need to run it over https and use await to wait for the share() method to complete, from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/await */
	await navigator.share({ title, url })
}

// Finally, a helper function to fetch data from the API, then run a callback function with it:
let fetchJson = (url, callback, pageResponses = []) => {
	fetch(url, { cache: 'no-store' })
		.then((response) => response.json())
		.then((json) => {
			// Add this page to our temporary “accumulator” list parameter (an array).
			pageResponses.push(json)

			// Are.na response includes this “there are more!” flag (a boolean):
			if (json.meta && json.meta.has_more_pages) { // If that exists and is `true`, keep going…
				// Fetch *another* page worth, passing along our previous/accumulated responses.
				fetchJson(`${url}&page=${pageResponses.length + 1}`, callback, pageResponses)
			} else { // If it is `false`, there are no more pages…
				// “Flattens” them all together as if they were one page response.
				json.data = pageResponses.flatMap((page) => page.data)

				// Return the data to the callback!
				callback(json)
			}
	})
}

// More on `fetch`:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch

// Now that we have said all the things we *can* do, go get the channel data:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}`, (json) => {
	// console.log(json) // Always good to check your response!

	placeChannelInfo(json) // Pass all the data to the first function, above.
	renderUser(json.owner) // Pass just the nested object `.owner`.
})

// Get your info to put with the owner's:
fetchJson(`https://api.are.na/v3/users/${myUsername}/`, (json) => {
	// console.log(json) // See what we get back.

	renderUser(json) // Pass this to the same function, no nesting.
})

// And the data for the blocks:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}/contents?per=100&sort=position_desc`, (json) => {
	// console.log(json) // See what we get back.

	// Loop through the nested `.data` array (list).
	json.data.forEach((blockData) => {
		// console.log(blockData) // The data for a single block.

		renderBlock(blockData) // Pass the single block’s data to the render function.
	})

	/* initialize interaction with the blocks, from eric's example */
	initInteraction()

	/* enabling the filter navigation selection logic */
	navAnimation()
})
