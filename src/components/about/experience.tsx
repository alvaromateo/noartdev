import { EducationData, ExperienceData, isExperience } from "@/src/global/types"

export default function Experience({
  data,
} : {
  data: ExperienceData | EducationData
}) {
  let title: JSX.Element = <></>
  if (isExperience(data)) {
    title = <div className='flex justify-between'>
      <h3 className='text-subtitle text-lg'>{data.title}</h3>
      <p className='text-comment'>{data.companyName}</p>
    </div>
  } else {
    title = <h3 className='text-subtitle text-lg'>{data.universityName}</h3>
  }

  return (
    <div className={`
      grid grid-cols-4 md:justify-items-stretch md:items-center
      py-6
    `}>
      <div className={`
        md:col-start-1 flex flex-col items-center
        text-comment text-sm
      `}>
        <p>{data.dateStart}</p>
        <p> - </p>
        <p>{data.dateEnd}</p>
      </div>
      <div className={`
        md:col-span-3
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