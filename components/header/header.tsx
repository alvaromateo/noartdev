import DarkButton from './dark-button';
import Logo from './logo';

export default function Header() {
  return (
    <header className='bg-mantle'>
      <nav>
        <Logo></Logo>
        <ul>
          <li>About</li>
          <li>Projects</li>
          <li>Articles</li>
          <li>Hobbies</li>
        </ul>
        <DarkButton></DarkButton>
      </nav>
    </header>
  )
}