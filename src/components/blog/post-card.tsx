import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import { Post } from "@/src/global/types/custom"
import PublishDate from "./post/publish-date"
import Tags, { TagsType } from "./post/tags"
import { Suspense } from 'react'
import ReadMark from './post/read-mark'

export default function PostCard({
  post
} : {
  post: Post
}) {
  return (
    <li className='bg-mantle flex flex-row justify-between my-6 p-4 rounded-full'>
      <div className='flex flex-col flex-wrap mx-6'>
        <h3 className='text-xl text-subtitle ml-2'>
          { post.title }
        </h3>
        <PublishDate className='my-2 text-comment ml-2'
          year={post.publishDate.year}
          month={post.publishDate.month}
          day={post.publishDate.day}/>
        <Tags list={post.tags} type={TagsType.Card}/>
      </div>
      <div className='flex flex-col mx-6 justify-center text-logo'>
        <Suspense fallback={
          <RadioButtonUncheckedIcon/>
        }>
          <ReadMark pagePath={post.path}/>
        </Suspense>
      </div>
    </li>
  )
}
