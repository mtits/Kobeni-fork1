export const usePageHead = (subtitle: string) => {
  const appName = useState('appName')

  return useHead({
    title: `${appName.value} - ${subtitle}`,
  })
}
