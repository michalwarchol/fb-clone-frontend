import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { IoMdPhotos } from "react-icons/Io";
import { useGetRecentStoriesQuery } from "../../generated/graphql";
import ImageStory from "./ImageStory";
import StoriesBar from "./StoriesBar";
import StoryDisplay from "./StoryDisplay";
import TextStory from "./TextStory";

interface Props {
  id?: number;
}

const Body: React.FC<Props> = ({ id }) => {
  const [activeUserStory, setActiveUserStory] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState<number>(0);
  const [{ data }] = useGetRecentStoriesQuery();
  let initialMount = useRef(true);

  useEffect(()=>{
    if(initialMount && data){
      let isUser = data.getRecentStories.find(elem=>elem.creator._id==id);
      if(isUser){
        setActiveUserStory(id);
        initialMount.current=false;
      }
    }
  }, [])

  let seen = [];
  let stories = [];
  let storiesToDisplay = [];
  let userStories = [];
  if(data){
    let uniqueStories = data.getRecentStories?.filter((story) => {
      if (!(story.userId in seen)) {
        seen[story.userId] = 1;
        return true;
      }
      seen[story.userId] += 1;
      return false;
    });
  
    stories = uniqueStories?.map((elem) => {
      return {
        story: elem,
        length: seen[elem.creator._id],
      };
    });
  
    userStories = data.getRecentStories.filter((story) => {
      if (story.creator._id == activeUserStory) return true;
      return false;
    });
  
    storiesToDisplay = userStories.map((story, index) => {
      if (!!story.imageId) {
        return <ImageStory imageId={story.imageId} key={index} />;
      } else {
        return (
          <TextStory
            text={story.text}
            font={story.font}
            gradient={story.gradient}
            displayed={displayed}
            setDisplayed={setDisplayed}
            activeUserStory={activeUserStory}
            setActiveUserStory={setActiveUserStory}
            storiesLength={userStories.length}
            time={userStories[displayed].time}
            key={index}
            nextActiveUser={
              activeUserStory != null
                ? parseInt(
                    Object.keys(seen)[
                      Object.keys(seen).indexOf(activeUserStory.toString()) + 1
                    ]
                  )
                : null
            }
          />
        );
      }
    });
  }

  return (
    <Flex h="100vh">
      <StoriesBar
        activeUserStory={activeUserStory}
        setActiveUserStory={setActiveUserStory}
        stories={stories}
        setDisplayed={setDisplayed}
      />
      {data && activeUserStory 
      ? 
      <StoryDisplay
      displayed={displayed}
      setDisplayed={setDisplayed}
      setActiveUserStory={setActiveUserStory}
      stories={storiesToDisplay}
      nextActiveUser={
        activeUserStory != null
          ? parseInt(
              Object.keys(seen)[
                Object.keys(seen).indexOf(activeUserStory.toString()) + 1
              ]
            )
          : null
      }
      previousActiveUser={
        activeUserStory != null 
        ? parseInt(Object.keys(seen)[Object.keys(seen).indexOf(activeUserStory.toString())-1])
        :null
      }
    />
    :
    <Flex justify="center" align="center" direction="column" h="100%" w="100%" ml="360px">
        <Icon as={IoMdPhotos} fontSize="100px" />
        <Text fontWeight="bold" fontSize="22px">
          Select a story to open.
        </Text>
      </Flex>
    }
      
    </Flex>
  );
};
export default Body;
