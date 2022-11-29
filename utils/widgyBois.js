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
