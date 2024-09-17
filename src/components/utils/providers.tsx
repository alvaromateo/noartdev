import FullScreenModalProvider from '@/src/providers/fullscreen-modal'
import IntlProvider from '@/src/providers/intl'
import MobileProvider from '@/src/providers/mobile'
import RecentLinksProvider from '@/src/providers/recent-links'
import ThemeProvider from '@/src/providers/theme'

export default function Providers({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <IntlProvider>
      <ThemeProvider>
        <MobileProvider>
          <FullScreenModalProvider>
            <RecentLinksProvider>
              {children}
            </RecentLinksProvider>
          </FullScreenModalProvider>
        </MobileProvider>
      </ThemeProvider>
    </IntlProvider>
  )
}