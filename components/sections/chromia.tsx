"use client";

import { Icons } from "@/components/icons";
import { Section } from "@/components/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ripple } from "@/components/ui/ripple";

const contributors = [
  {
    name: "Alice Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Bob Brown",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  },
  {
    name: "Charlie Davis",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  },
  {
    name: "Diana Evans",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  },
  {
    name: "Ethan Ford",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  },
];

export function Chromia() {
  return (
    <Section id="chromia">
      <div className="border-x border-t overflow-hidden relative">
        <Ripple />
        <div className="p-6 text-center py-12">
          {/* <p className="text-muted-foreground mb-6 text-balance max-w-prose mx-auto font-medium">
            We&apos;re grateful for the amazing open-source community that helps
            make our project better every day.
          </p> */}
          <div className="flex-1 flex justify-center -space-x-6">
            <svg className="w-36 h-36" fill="none" viewBox="0 0 130 30">
              <g className="inline-block" opacity="1">
                <g>
                  <path
                    fill="#FFB0C2"
                    d="M16.877 20.604a5.884 5.884 0 01-5.207 3.151c-3.252 0-5.889-2.647-5.889-5.912s2.637-5.912 5.89-5.912a5.884 5.884 0 015.206 3.151h6.13c-1.23-5.147-5.832-8.977-11.337-8.977C5.225 6.105 0 11.35 0 17.82s5.225 11.716 11.67 11.716c5.489 0 10.08-3.808 11.326-8.932h-6.12z"
                  ></path>
                  <path
                    fill="#CC91F0"
                    d="M20.897 10.676a5.875 5.875 0 002.157-4.557c0-3.247-2.622-5.879-5.856-5.879s-5.856 2.632-5.856 5.879v.004c.11-.003.218-.005.327-.005 3.76 0 7.097 1.786 9.228 4.558z"
                  ></path>
                  <path
                    fill="#CC66B8"
                    d="M17.202 12.003c1.403 0 2.69-.495 3.7-1.321-2.131-2.771-5.47-4.557-9.228-4.557-.11 0-.218.002-.327.005.002 3.244 2.623 5.874 5.855 5.873z"
                  ></path>
                </g>
              </g>
              <g className="inline-block" opacity="1">
                <g>
                  <path
                    fill="#FFB0C2"
                    d="M35.846 29.188v-9.33c0-2.202-.853-3.457-2.713-3.457-1.92 0-2.834 1.132-2.834 3.243v9.544h-5.058V6.551h5.058v7.28c.731-1.376 2.377-2.202 4.389-2.202 3.87 0 6.216 2.447 6.216 6.883v10.676h-5.058z"
                  ></path>
                </g>
              </g>
              <g className="inline-block" opacity="1">
                <g>
                  <path
                    fill="#FFB0C2"
                    d="M55.284 14.684a3.048 3.048 0 00-3.042-3.054 3.048 3.048 0 00-3.042 3.054 3.048 3.048 0 003.042 3.054 3.048 3.048 0 003.042-3.054z"
                  ></path>
                  <path
                    fill="#FFB0C2"
                    d="M43.617 12.192h4.754V29.17h-4.754V12.192z"
                  ></path>
                </g>
              </g>
              <g className="inline-block" opacity="1">
                <g>
                  <path
                    fill="#FFB0C2"
                    d="M64.687 11.682c-4.965 0-8.99 4.04-8.99 9.025 0 4.984 4.025 9.025 8.99 9.025s8.99-4.04 8.99-9.025c0-4.984-4.025-9.025-8.99-9.025zm0 13.308a4.275 4.275 0 01-4.267-4.283 4.275 4.275 0 014.267-4.283 4.275 4.275 0 014.266 4.283 4.275 4.275 0 01-4.266 4.283z"
                  ></path>
                </g>
              </g>
              <g className="inline-block" opacity="1">
                <g>
                  <path
                    fill="#FFF7F7"
                    d="M96.589 29.178V20.03c0-2.662-.853-3.64-2.59-3.64-1.92 0-2.804 1.163-2.804 3.395v9.392h-5.058v-9.36c0-2.204-.793-3.427-2.53-3.427-1.98 0-2.864 1.284-2.864 3.64v9.147h-5.06V12.2h4.725v1.804h.06c.884-1.59 2.5-2.385 4.663-2.385 2.194 0 3.809 1.1 4.876 3.028 1.219-1.927 3.047-3.028 5.363-3.028 3.779 0 6.277 2.325 6.277 7.066v10.493h-5.058z"
                  ></path>
                </g>
              </g>
              <g className="inline-block" opacity="1">
                <g>
                  <path
                    fill="#FFF7F7"
                    d="M109.941 7.991a3.048 3.048 0 00-3.042-3.053 3.048 3.048 0 00-3.042 3.053 3.048 3.048 0 003.042 3.054 3.048 3.048 0 003.042-3.054z"
                  ></path>
                  <path
                    fill="#FFF7F7"
                    d="M109.428 12.192h-5.059V29.17h5.059V12.192z"
                  ></path>
                </g>
              </g>
              <g className="inline-block" opacity="1">
                <g>
                  <path
                    fill="#FFF7F7"
                    d="M124.941 29.178v-1.835h-.061c-.731 1.499-2.742 2.416-4.967 2.416-4.998 0-8.471-3.946-8.471-9.085 0-5.018 3.626-9.055 8.471-9.055 2.072 0 3.992.826 4.967 2.385h.061V12.2H130v16.978h-5.059zm0-8.505a4.3 4.3 0 00-4.297-4.313c-2.315 0-4.144 1.927-4.144 4.375 0 2.355 1.859 4.283 4.206 4.283 2.376 0 4.235-1.897 4.235-4.345z"
                  ></path>
                </g>
              </g>
            </svg>
            {/* {contributors.map((contributor, index) => (
              <div key={index}>
                <Avatar className="size-12 relative border-2 border-background bg-muted">
                  <AvatarImage
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg font-semibold">
                    {contributor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))} */}
          </div>
          <div className="flex-1 flex justify-center">
            {/* <Button variant="secondary" className="flex items-center gap-2">
              <Icons.github className="h-5 w-5" />
              Become a contributor
            </Button> */}
          </div>
        </div>
      </div>
    </Section>
  );
}
