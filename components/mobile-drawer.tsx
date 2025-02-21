import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent, DrawerFooter,
  DrawerHeader, DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <Link
            href="/"
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
          >
            <Icons.logo className="w-auto h-[40px]" />
          </Link>
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
            <DrawerClose
              className={cn(
                buttonVariants({ variant: "default" }),
                "text-white rounded-md group w-full"
              )}
            >
              Evaluate
            </DrawerClose>
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
