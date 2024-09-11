import { unstable_setRequestLocale } from 'next-intl/server'

export default function Projects({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  return (
    <main>
      <p>Hello world!</p>
      <p>Projects page</p>

      <ol>
        <li>
          <a href='https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/'>
            Single variable calculus
          </a>
        </li>
        <li>
          <a href='https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/'>
            Mathematics for computer science
          </a>
        </li>
        <li>
          <a href='https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/'>
            Introduction to algorithms
          </a>
        </li>
        <li>
          <a href='https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/'>
            Introduction to algorithms (extra topics)
          </a>
        </li>
        <li>
          <a href='https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/'>
            Design and Analysis of Algorithms
          </a>
        </li>
        <li>
          <a href='https://ocw.mit.edu/courses/6-851-advanced-data-structures-spring-2012/'>
            Advanced data structures
          </a>
        </li>
        <li>

        </li>
      </ol>

      <p>Extra</p>
      <ol>
        <li>
          <p>Algorithms</p>
          <ol>
            <li>
              <a href='https://ocw.mit.edu/courses/6-5060-algorithm-engineering-spring-2023/'>
                Algorithm engineering
              </a>
            </li>
            <li>
              <a href='https://ocw.mit.edu/courses/6-438-algorithms-for-inference-fall-2014/'>
                Algorithms for inference
              </a>
            </li>
          </ol>
        </li>
        <li>
          <p>Mathematics</p>
          <ol>
            <li>
              <a href='https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/'>
                Multi variable calculus
              </a>
            </li>
            <li>
              <a href='https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/'>
                Differential equations
              </a>
            </li>
            <li>
              <a href='https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/'>
                Linear algebra
              </a>
            </li>
            <li>
              <a href='https://ocw.mit.edu/courses/18-100c-real-analysis-fall-2012/'>
                Real analysis
              </a>
            </li>
            <li>
              <a href='https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/'>
                Introduction to probability and statistics
              </a>
            </li>
            <li>
              <a href='https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/'>
                Probabilistic systems analysis and applied probability
              </a>
            </li>
            <li>
              <a href='https://ocw.mit.edu/courses/18-657-mathematics-of-machine-learning-fall-2015/'>
                Mathematics of machine learning
              </a>
            </li>
          </ol>
        </li>
        <li>
          <p>Artificial intelligence</p>
          <ol>
            <li>
              <a href='https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/'>
                Artificial intelligence
              </a>
            </li>
          </ol>
        </li>
        <li>
          <p>Machine learning</p>
          <ol>
            <li>
              <a href='https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/'>
                Introduction to machine learning
              </a>
            </li>
            <li>
              <a href='https://ocw.mit.edu/courses/6-867-machine-learning-fall-2006/'>
                Machine learning
              </a>
            </li>
          </ol>
        </li>
        <li>
          <p>Deep learning</p>
          <ol>
            <li>
              <a href='https://ocw.mit.edu/courses/6-s191-introduction-to-deep-learning-january-iap-2020/'>
                Introduction to deep learning
              </a>
            </li>
          </ol>
        </li>
        <li>
          <p>Natural Language Processing</p>
          <ol>
            <li>
              <a href='https://ocw.mit.edu/courses/6-864-advanced-natural-language-processing-fall-2005/'>
                Advanced natural language processing
              </a>
            </li>
          </ol>
        </li>
      </ol>
    </main>
  )
}
