import { useState, useEffect } from 'react'

export function useLatestRelease() {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [version, setVersion] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatest() {
      try {
        const response = await fetch('https://api.github.com/repos/mateosi2536/PlenoAgentUpdates/releases/latest')
        if (!response.ok) throw new Error('Failed to fetch release')
        const data = await response.json()
        
        // Find the .exe asset
        const exeAsset = data.assets.find((a: any) => a.name.endsWith('.exe'))
        if (exeAsset) {
          setDownloadUrl(exeAsset.browser_download_url)
          setVersion(data.tag_name)
        }
      } catch (err) {
        console.error('Error fetching latest release:', err)
        // Fallback to a generic link if API fails
        setDownloadUrl('https://github.com/mateosi2536/PlenoAgentUpdates/releases/latest')
      } finally {
        setLoading(false)
      }
    }

    fetchLatest()
  }, [])

  return { downloadUrl, version, loading }
}
