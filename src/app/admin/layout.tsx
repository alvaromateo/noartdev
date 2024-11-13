export default async function LocaleLayout({
  children,
} : {
  children: React.ReactNode,
}) {
  return (
    <main className={`
      px-[8%] lg:w-[1024px] lg:px-12 lg:mx-auto
      py-4 md:py-8 content flex
    `}>
      {children}
    </main>
  )
}