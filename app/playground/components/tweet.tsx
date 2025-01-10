"use client";
import { useEffect } from "react";
import {
  type TweetProps,
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  useTweet,
} from "react-tweet";

export const Tweet = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  onData,
  onError,
}: TweetProps | any) => {
  const { data, error, isLoading } = useTweet(id, apiUrl);
  useEffect(() => {
    if (onData) {
      onData(data);
    }
  }, [data]);

  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={onError ? onError(error) : error} />;
  }

  return <EmbeddedTweet tweet={data} components={components} />;
};
