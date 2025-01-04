import Link from "next/link"

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 py-4 ${className}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#FFF8F8]">
          EVAEngine
        </Link>
      </div>
    </header>
  )
}

