import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import { Post } from "@/src/global/types/custom"
import PublishDate from "./post/publish-date"
import Tags, { TagsType } from "./post/tags"
import { Suspense } from 'react'
import ReadMark from './post/read-mark'
import { Link } from '@/src/i18n/routing'

export default function PostCard({
  post
} : {
  post: Post
}) {
  return (
    <Link href={{ pathname: post.path }} scroll={false}>
      <li className={`
        bg-mantle flex flex-row justify-between hover:bg-crust
        my-4 p-2 rounded-2xl
        md:my-6 md:p-4 md:rounded-full
      `}>
        <div className='flex flex-col flex-wrap mx-4 md:mx-10'>
          <h3 className='text-sm md:text-xl text-subtitle'>
            { post.title }
          </h3>
          <PublishDate className='text-xs md:text-base my-2 text-comment'
            year={post.publishDate.year}
            month={post.publishDate.month}
            day={post.publishDate.day}/>
          <Tags list={post.tags} type={TagsType.Card}/>
        </div>
        <div className='flex flex-col justify-center mx-4 text-2xl/[0px] md:mx-6 md:text-logo'>
          <Suspense fallback={
            <RadioButtonUncheckedIcon/>
          }>
            <ReadMark pagePath={post.path}/>
          </Suspense>
        </div>
      </li>
    </Link>
  )
}
