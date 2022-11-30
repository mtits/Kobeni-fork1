/**
 * removes a specific widget-script-tag from the document head
 */
export const removeScriptFromHead = () => {
  const elementToYeet = document.getElementById('widget-script-tag')

  if (document.head.contains(elementToYeet)) {
    console.info('Found "widget-script-tag" in document head, removing now.')

    document.head.removeChild(document.getElementById('widget-script-tag'))
  }
}

/**
 * this is infected with the disease called jQuery, use with caution
 */
export const yeetTheWidgy = () => {
  // i can't believe you've done this
  if (window.wpwl !== undefined && window.wpwl.unload !== undefined) {
    window.wpwl.unload() // this unloads it

    // this removes PAY.ON script from the head
    $('script').each(function () {
      if (this.src.indexOf('static.min.js') !== -1) {
        $(this).remove()

        console.info('The script "static.min.js" has been purged!')
      }
    })
  }
}
