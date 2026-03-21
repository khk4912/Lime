/// <reference types="navigation-api-types" />
/// <reference types="vite-plugin-svgr/client" />

interface HTMLVideoElement {
  captureStream: () => MediaStream
  mozCaptureStream: () => MediaStream
}

interface MediaRecorder {
  recordInfo?: RecordInfo
}

interface RecordInfo {
  streamInfo: StreamInfo

  startDateTime: number
  stopDateTime: number

  resultBlobURL: string
  isMP4: boolean

  highFrameRec?: boolean
}
