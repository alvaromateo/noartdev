import SocialIcons from '../utils/social-icons'

export default function Footer() {
    return (
      <footer className={`
        my-0 px-6 md:px-12
        footer bg-mantle border-t border-crust
        flex justify-between align-middle text-xs/4
      `}>
        <div className='my-auto'>
          <p>© 2024 Alvaro Mateo</p>
          <p>All rights reserved</p>
        </div>
        <SocialIcons/>
      </footer>
    )
  }
