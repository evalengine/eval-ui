import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentLogs() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="flex-shrink-0 h-9 w-9 rounded-full">
            {/* <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar> */}
          </Skeleton>
          <div className="ml-4 space-y-1 w-full">
            <div className="text-sm font-medium leading-none">
              <Skeleton className="h-4 w-full"></Skeleton>
            </div>
            <div className="text-sm text-muted-foreground">
              <Skeleton className="h-4 w-full"></Skeleton>
            </div>
          </div>
          <Skeleton className="w-16 h-4 flex flex-shrink-0">
            <div className="ml-auto font-medium"></div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
}
