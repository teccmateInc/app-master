// creates an anchor tag, assigns the given href,
// appends it to the document
// triggers the download via click
// then detach the link from the document.

const triggerFileDownload = href => {
    const link = document.createElement('a')
    link.setAttribute('href', href)
    link.setAttribute('download', href.substr(href.lastIndexOf('/') + 1))
    document.body.appendChild(link) // Required for FF
    link.click()
    document.body.removeChild(link)
}

export default triggerFileDownload
