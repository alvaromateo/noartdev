export default function Footer() {
    return (
      <footer className={`
        footer bg-mantle flex justify-between align-middle
        text-xs/3 md:text-base/4
      `}>
        <div className='my-auto'>
          <p className='mb-1'>© 2024 Alvaro Mateo</p>
          <p>All rights reserved</p>
        </div>
        <ul className='flex flex-col my-auto'>
          <li>LinkedIn</li>
          <li>GitHub</li>
        </ul>
      </footer>
    )
  }
  // TODO: get the icons for linkedin and github
