import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AuroraText } from "@/components/aurora-text";
import { siteConfig } from "@/lib/config";
import { Logo } from "./sections/header";

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerTitle>
        <DrawerContent>
          <DrawerHeader className="px-6">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center space-x-2"
            >
              <Icons.logo className="w-auto h-[40px]" />
              {/* <AuroraText
                containerClassName="leading-normal font-bold text-2xl"
                className="w-[30vw] h-[30vw]"
              >
                Eval Engine
              </AuroraText> */}
              <Logo className="text-2xl" />
            </Link>
            <nav>
              <ul className="mt-7 text-left">
                {siteConfig.header.map((item, index) => (
                  <li key={index} className="my-3">
                    <DrawerClose asChild>
                      <Link href={item.href || ""} className="font-semibold">
                        {item.label}
                      </Link>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
            </nav>
          </DrawerHeader>
          <DrawerFooter>
            <Link href="/litepaper" className="w-full block">
              <DrawerClose
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-white rounded-md group w-full"
                )}
              >
                LitePaper
              </DrawerClose>
            </Link>
            <Link href="/playground/tweets" className="w-full block">
              <DrawerClose className="w-full" asChild>
                <RainbowButton
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "text-white rounded-md group w-full"
                  )}
                >
                  Evaluate
                </RainbowButton>
              </DrawerClose>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </DrawerTitle>
    </Drawer>
  );
}
