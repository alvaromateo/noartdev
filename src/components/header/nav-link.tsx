export default function NavLink({
  selected,
  setShowModal,
  children
} : {
  selected?: boolean,
  setShowModal?: (show: boolean) => void,
  children: React.ReactNode
}) {
  return (
    <div className={`
      relative block px-4 py-2
      ${selected ? 'text-hover-link' : ''} hover:text-hover-link
    `}>
      <span onClick={ setShowModal !== undefined
        ? () => setShowModal(false)
        : undefined
      }>
        {children}
      </span>
      { selected ?
        <span className={`
          absolute inset-x-1 -bottom-px h-[2px]
          bg-gradient-to-r from-sky/0 via-sapphire/40 to-sky/0
        `}/>
        :
        null
      }
    </div>
  )
}