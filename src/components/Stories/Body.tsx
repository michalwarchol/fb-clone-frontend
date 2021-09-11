import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useGetRecentStoriesQuery } from "../../generated/graphql";
import StoriesBar from "./StoriesBar";
import StoryDisplay from "./StoryDisplay";

interface Props {
  id?: number;
}

const Body: React.FC<Props> = ({ id }) => {
  const [activeUserStory, setActiveUserStory] = useState<number | null>(
    id ? id : null
  );
  const [{ data }] = useGetRecentStoriesQuery();
  let seen = [];
  let uniqueStories = data?.getRecentStories?.filter((story) => {
    if (!(story.userId in seen)) {
      seen[story.userId] = 1;
      return true;
    }
    seen[story.userId] += 1;
    return false;
  });

  const stories = uniqueStories?.map((elem) => {
    return {
      story: elem,
      length: seen[elem.creator._id],
    };
  });

  const storiesToDisplay = data?.getRecentStories.filter((story) => {
    if (story.creator._id == activeUserStory) return true;
    return false;
  });

  return (
    <Flex h="100vh">
      <StoriesBar
        activeUserStory={activeUserStory}
        setActiveUserStory={setActiveUserStory}
        stories={stories}
      />
      <StoryDisplay
        activeUserStory={activeUserStory}
        setActiveUserStory={setActiveUserStory}
        stories={storiesToDisplay}
      />
    </Flex>
  );
};
export default Body;
