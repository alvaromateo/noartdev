'use client'

import BackToTop from "../../utils/back-to-top"
import Progress from "./progress"
import ReadMark from "./read-mark"

export default function BottomDrawer() {
  return (
    <div>
      <Progress/>
      <ReadMark/>
      <BackToTop/>
    </div>
  )
}