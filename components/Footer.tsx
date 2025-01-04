import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 px-4 glossy relative z-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-[#F5EEEE]">&copy; 2025 EVAEngine. All rights reserved.</p>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#" className="text-[#F5EEEE] hover:text-[#CC91F0] transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-[#F5EEEE] hover:text-[#CC91F0] transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-[#F5EEEE] hover:text-[#CC91F0] transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

