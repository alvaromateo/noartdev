import { EducationData, ExperienceData, isExperience } from '@/src/global/types/custom'

export default function Experience({
  data,
} : {
  data: ExperienceData | EducationData
}) {
  let title: JSX.Element = <></>
  if (isExperience(data)) {
    title = <div className='flex justify-between items-center'>
      <h3 className='text-subtitle text-lg mr-8'>{data.title}</h3>
      <p className='text-comment'>{data.companyName}</p>
    </div>
  } else {
    title = <h3 className='text-subtitle text-lg'>{data.universityName}</h3>
  }

  return (
    <div className={`
      grid grid-cols-1 gird-rows-2 md:grid-cols-4 md:grid-rows-1
      justify-items-stretch items-center
      py-6 text-xs md:text-base
    `}>
      <div className={`
        col-start-1 flex flex-row md:flex-col items-center
        justify-between text-comment text-sm
      `}>
        <p className='mr-8 md:mr-0'>{data.dateEnd}</p>
        <p className='hidden md:block'> - </p>
        <p>{data.dateStart}</p>
      </div>
      <div className={`
        md:col-span-3 mt-4 md:mt-0
      `}>
        {title}
        <ul className='mt-4'>
          {
            data.description.map((line, index) => {
              return (
                <li key={index}>
                  {line}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}