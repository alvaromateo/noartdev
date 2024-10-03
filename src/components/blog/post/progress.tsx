'use client'

export default function Progress({
  display,
  percentage,
} : {
  display: boolean,
  percentage: number,
}) {
  if (percentage > 100) {
    percentage = 100
  }
  if (percentage < 0) {
    percentage = 0
  }

  return display &&
    <div className='bg-surface-1 rounded-full p-[4px] w-3/5 md:p-[6px] md:w-2/4'>
      <div className='bg-surface-0 rounded-full p-[2px] md:p-[3px]'>
        <div className='bg-success rounded-full h-[4px] md:h-[6px]'
          style={{width: `${percentage}%`}}/>
      </div>
    </div>
}
