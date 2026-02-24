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
			`
			<li class="link-block">
				<button type="button" class="link-button">
					<img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }">
				</button>
				<dialog>
					<a href="${blockData.source.url}"><img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }" class="thumbnail"></a>
					<button class="close"></button>
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
				<dialog>
					<img src="${blockData.image.large.src_2x}">
					<button class="close"></button>
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
				<dialog>
					${blockData.content.html}
					<button class="close"></button>
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
				<li>
					<video controls src="${blockData.attachment.url}"></video>
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
					<dialog>
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
					<dialog>
						<audio controls src="${blockData.attachment.url}"></audio>
						<button class="close"></button>
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
					<dialog>
						${ blockData.embed.html }
						<button class="close"></button>
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

		openButton.onclick = () => {
			dialog.showModal()
		}

		closeButton.onclick = () => {
			dialog.close()
		}

		dialog.onclick = (event) => { // Listen on our `modal` also…
			if (event.target == dialog) { // Only if clicks are to itself (the background).
				dialog.close() // Close it then too.
			}
		}
	})
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
})
