import { unstable_setRequestLocale } from 'next-intl/server'

import PublishDate from '@/src/components/blog/post/publish-date'
import Tag from '@/src/components/blog/post/tag'
import CodeBlock from '@/src/components/blog/code-block/code-block'

export default function Blog({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)

  return (
    <>
      <section id='post-intro'>
        <h1 className='text-title text-4xl text-center mt-4 mb-8'>
          How to train a caique
        </h1>
        <PublishDate year={2024} month={9} day={20}/>
        <ul className='flex flex-row justify-center mb-8'>
          <Tag>parrot</Tag>
          <Tag>training</Tag>
          <Tag>animal</Tag>
        </ul>
        <p className='text-comment text-center mb-16'>
          This post is about the things to do to make sure that your caique is happy and healthy.
          Includes tips on how to train him properly and what food to give him so he lives long and prosper.
        </p>
        <></>
      </section>
      <section id='post-content'>
        <h2 className='text-subtitle text-2xl my-8'>Training</h2>
        <p className='mb-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </p>
        <p className='mb-4'>
          Phasellus at augue et libero eleifend convallis. Nullam at elit at ante tempus vehicula id vitae lectus.
          Donec auctor ligula tempor justo tristique lacinia. Suspendisse erat nisl, sodales vitae fringilla molestie,
          facilisis at lacus. In dignissim dui sed libero semper suscipit. Nunc lorem libero, gravida mattis ipsum
          pharetra, sodales rhoncus ligula. Sed vulputate ullamcorper dolor, porta semper ligula sollicitudin sodales.
          Morbi lacus diam, pellentesque in est eu, tempor venenatis magna. Vestibulum mollis nulla id faucibus
          facilisis. In sed libero venenatis, tincidunt felis ac, blandit enim. Nulla vestibulum dui ac diam
          ullamcorper, a facilisis risus ullamcorper.
        </p>

        <h2 className='text-subtitle text-2xl my-8'>Food</h2>
        <p className='mb-4'>
          Suspendisse eu nibh lacus. Aliquam congue nulla magna, vitae gravida tortor eleifend non.
          Proin fermentum lacus eu tincidunt auctor. Maecenas eget finibus purus. Sed pretium sodales quam.
          Nam eget lacus et ex lobortis gravida. Quisque pharetra ultricies tincidunt.
        </p>
        <p className='mb-4'>
          Donec dignissim eu purus non finibus. Praesent iaculis lacus sed nulla dignissim,
          eget mattis eros vestibulum. Vivamus tristique accumsan aliquam. Duis pharetra nisl ut nibh convallis,
          sit amet semper lorem eleifend. Pellentesque iaculis sagittis lorem non pharetra.
          Sed laoreet nibh vitae velit volutpat, eu placerat diam maximus.
        </p>
        <h3 className='text-lavender text-lg font-bold my-8'>What to give</h3>
        <p className='mb-4'>
          Aenean felis mi, posuere nec pretium eget, pretium vitae nisi.
          Integer dignissim varius sem, eget convallis erat auctor id. In hac habitasse platea dictumst.
          Ut ut enim venenatis, elementum risus id, malesuada dolor.
          Nulla pharetra odio sed volutpat commodo. Curabitur vitae diam orci.
        </p>
        <h3 className='text-lavender text-lg font-bold my-8'>What to avoid</h3>
        <p className='mb-4'>
          Donec tellus dui, volutpat vitae finibus in, condimentum vel odio.
          In id magna id velit congue lacinia. Cras vel quam non ipsum vestibulum euismod sed eget elit.
          Donec eget nulla non odio convallis sagittis at nec risus. Nam pulvinar ante est,
          tempus tempor nisl sagittis quis. Duis suscipit lacinia turpis id lobortis.
          Nulla pulvinar lacus nec sapien ullamcorper, dignissim molestie ex tempus.
          Integer eu semper metus, et iaculis enim. Maecenas leo sem, sollicitudin sed mauris at, semper porta massa.
          Fusce non volutpat libero, vitae egestas mi. Phasellus molestie bibendum auctor. Vivamus non vehicula orci.
        </p>
        <CodeBlock language='js'>Example</CodeBlock>
      </section>
    </>
  )
}
