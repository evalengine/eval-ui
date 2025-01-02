import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 py-4 ${className}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#FFF8F8]">
          EVAEngine
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><Link href="#features" className="text-[#FFF8F8] hover:text-[#CC91F0] transition-colors">Features</Link></li>
            <li><Link href="#benefits" className="text-[#FFF8F8] hover:text-[#CC91F0] transition-colors">Benefits</Link></li>
            <li>
              <Button variant="outline" className="text-[#CC91F0] border-[#CC91F0] hover:bg-[#CC91F0] hover:text-[#1F1A23] glossy glossy-hover">
                Get Started
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

