export const usePageHead = (subtitle: string) => {
  const appName = useState('appName')

  useHead({
    title: `${appName.value} - ${subtitle}`,
  })
}
