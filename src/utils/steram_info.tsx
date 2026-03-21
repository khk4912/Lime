export interface StreamInfo {
  streamerName: string
  title: string
}

export function getStreamInfo (): StreamInfo {
  if (!(window.location.pathname.endsWith('/live'))) {
    return { streamerName: 'unknown', title: 'unknown' }
  }

  const streamerName = document.querySelector('a[class^="user_name"]')?.textContent ?? 'streamer'
  const title = document.querySelector('span[class^="live_title"]')?.textContent ?? 'title'

  return {
    streamerName,
    title
  }
}
