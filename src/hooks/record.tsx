import { storage } from '#imports'
import { useRef, useState } from 'react'
import { getStreamInfo } from '@/utils/steram_info'

type RecordStatus = 'recording' | 'stopped'

export function useRecord () {
  const [recordStatus, setRecordStatus] = useState<RecordStatus>('stopped')
  const recorderRef = useRef<MediaRecorder | null>(null)

  const toggle = () => {
    if (recordStatus === 'recording') {
      const recorder = recorderRef.current
      if (recorder === null) {
        setRecordStatus('stopped')
        return
      }

      _stopRecord(recorder)
        .then((info) => {
          setRecordStatus('stopped')
          recorderRef.current = null
          if (info !== null) {
            download(info)
          }
        })
        .catch((error) => {
          console.error('Error occurred while stopping recording:', error)
        })
    } else {
      const recorder = _startRecord(recorderRef)
      if (recorder !== null) {
        setRecordStatus('recording')
      }
    }
  }

  return {
    recordStatus,
    isRecording: recordStatus === 'recording',
    toggle,
  }
}

function _startRecord (recorderRef: React.RefObject<MediaRecorder | null>): MediaRecorder | null {
  const video = getDefaultVideoElement()
  const streamInfo = getStreamInfo()

  if (video === null) {
    return null
  }

  const stream = video.captureStream()
  const isSupportMP4 = checkMP4()

  const videoBitrates = 4000000
  const options: MediaRecorderOptions = {
    mimeType: isSupportMP4
      ? 'video/mp4;codecs=avc1,mp4a.40.2'
      : 'video/webm;codecs=vp9,opus',
    videoBitsPerSecond: videoBitrates,
  }

  const recorder = new MediaRecorder(stream, options)
  recorder.recordInfo = {
    streamInfo,
    startDateTime: new Date().getTime(),
    stopDateTime: 0,
    resultBlobURL: '',
    isMP4: isSupportMP4,
  }

  recorder.ondataavailable = (event) => {
    if (event.data.size === 0) return
    if (recorder.recordInfo === undefined) {
      return
    }
    recorder.recordInfo.resultBlobURL = URL.createObjectURL(event.data)
  }

  recorderRef.current = recorder
  recorder.start()

  return recorder
}

async function _stopRecord (recorder: MediaRecorder): Promise<RecordInfo | null> {
  await new Promise<void>((resolve) => {
    recorder.onstop = async () => {
      const info = recorder.recordInfo

      if (info === undefined) {
        resolve()
        return
      }

      info.stopDateTime = new Date().getTime()

      await setRecordInfo(info)
      recorder.stream.getTracks().forEach((track) => {
        track.stop()
      })
      resolve()
    }

    recorder.stop()
  })

  return await getRecordInfo()
}

export const setRecordInfo = async (info: RecordInfo): Promise<void> => {
  await storage.setItem<RecordInfo>('local:recordInfo', info)
}

export const getRecordInfo = async (): Promise<RecordInfo | null> => {
  const info = await storage.getItem<RecordInfo>('local:recordInfo')
  return info ?? null
}

/**
 * 사용자의 Chrome 버전을 User-Agent 문자열에서 추출합니다.
 *
 * @returns Chrome 버전
 */
const getChromeVersion = (): number | false => {
  const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
  return (raw != null) ? parseInt(raw[2], 10) : false
}

/**
 * 녹화 기능에서 MP4로 녹화 여부를 확인합니다.
 * (Chrome 128 이상, video/mp4;codecs=avc1,mp4a.40.2 지원 여부, 사용자 설정)
 *
 * @returns MP4 녹화 지원 여부
 */
const checkMP4 = (): boolean => {
  const isAboveChrome128 = Number(getChromeVersion()) >= 128
  const isSupportMP4 = MediaRecorder.isTypeSupported('video/mp4;codecs=avc1,mp4a.40.2')

  return isSupportMP4 && isAboveChrome128
}

function getDefaultVideoElement (): HTMLVideoElement | null {
  const video = document.querySelector('video.vjs-tech')
  return video instanceof HTMLVideoElement ? video : null
}

function download (recordInfo: RecordInfo): void {
  const a = document.createElement('a')
  a.href =
    recordInfo.resultBlobURL
  a.download = `${recordInfo.streamInfo.streamerName}_${recordInfo.streamInfo.title}_${new Date(recordInfo.startDateTime).toISOString()}.${recordInfo.isMP4 ? 'mp4' : 'webm'}`
  a.click()

  URL.revokeObjectURL(recordInfo.resultBlobURL)
}
