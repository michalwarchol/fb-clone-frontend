import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import {
  FaAngry,
  FaGrinSquint,
  FaSadTear,
  FaSmile,
  FaSurprise,
  FaThumbsUp,
} from "react-icons/fa";
import {
  NotificationType,
  ReactionType,
  useCreateNotificationMutation,
  useReactionQuery,
  useReactMutation,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

const styles = {
  fontSize: "22px",
  _hover: { transform: "scale(1.2)" },
  _active: {},
  _focus: {},
  transition: "transform 0.1s ease-in-out",
  borderRadius: "50%",
  mr: "4px",
  w: "36px",
  h: "36px",
};

interface Props {
  postId: number;
  creatorId: number;
}

const ReactionButton: React.FC<Props> = ({ postId, creatorId }) => {
  const [{ data }] = useReactionQuery({
    variables: { postId },
    pause: isServer,
  });
  const [, react] = useReactMutation();
  const [, createNotification] = useCreateNotificationMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleLikeButton = async (index: string) => {
    await react({
      variables: { postId, value: 1, reaction: ReactionType[index] },
    });
    await createNotification({
      input: {
        info: "reacted on your post.",
        receiverId: creatorId,
        type: NotificationType.Reaction,
        link: "/profile/"+creatorId,
        postId
      },
    });
    close();
  };
  let color = "textSecondary";
  let icon = <BiLike />;
  let buttonText = "Like";
  if (data?.reaction) {
    switch (data.reaction?.reaction) {
      case "like":
        color = "active";
        icon = <FaThumbsUp />;
        buttonText = "Like";
        break;
      case "love":
        color="pinkLove"
        icon=<AiFillHeart />
        buttonText = "Love";
        break;
      case "care":
        color="yellowEmoji"
        icon=<FaSmile />
        buttonText = "Care";
        break;
      case "haha":
        color="yellowEmoji"
        icon=<FaGrinSquint/>
        buttonText = "Haha";
        break;
      case "wow":
        color="yellowEmoji"
        icon=<FaSurprise />
        buttonText = "Wow";
        break;
      case "sad":
        color="yellowEmoji"
        icon=<FaSadTear />
        buttonText = "Sad";
        break;
      case "angry":
        color="redAngry"
        icon=<FaAngry />
        buttonText = "Angry";
        break;
      default:
        color = "textSecondary";
        icon = <BiLike />;
        buttonText = "Like";
    }
  }

  return (
    <Box onMouseLeave={close}>
      <Popover
        isOpen={isOpen}
        placement="top-start"
        flip={false}
        offset={[0, 0]}
      >
        <PopoverTrigger>
          <Button
            bg="secondary"
            _hover={{ backgroundColor: "hover" }}
            _active={{ backgroundColor: "hover" }}
            w="100%"
            leftIcon={icon}
            onMouseOver={open}
            color={color}
            onClick={()=>handleLikeButton(buttonText)}
          >
            {data?.reaction?.reaction ? data.reaction.reaction.charAt(0).toUpperCase() + data.reaction.reaction.slice(1) : "Like"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          w="auto"
          borderRadius="28px"
          p="0"
          bg="secondary"
          border="0"
          _focus={{ outline: "0" }}
        >
          <PopoverBody p="0" bg="secondary">
            <IconButton
              aria-label="like"
              icon={<FaThumbsUp />}
              {...styles}
              color="textSecondary"
              bg="active"
              onClick={()=>handleLikeButton("Like")}
            />
            <IconButton
              aria-label="love"
              icon={<AiFillHeart />}
              {...styles}
              color="textSecondary"
              bg="pinkLove"
              onClick={()=>handleLikeButton("Love")}
            />
            <IconButton
              aria-label="care"
              icon={<FaSmile />}
              {...styles}
              bg="black"
              color="yellowEmoji"
              fontSize="46px"
              onClick={()=>handleLikeButton("Care")}
            />
            <IconButton
              aria-label="haha"
              icon={<FaGrinSquint />}
              {...styles}
              bg="black"
              color="yellowEmoji"
              fontSize="46px"
              onClick={()=>handleLikeButton("Haha")}
            />
            <IconButton
              aria-label="wow"
              icon={<FaSurprise />}
              {...styles}
              bg="black"
              color="yellowEmoji"
              fontSize="46px"
              onClick={()=>handleLikeButton("Wow")}
            />
            <IconButton
              aria-label="sad"
              icon={<FaSadTear />}
              {...styles}
              bg="black"
              color="yellowEmoji"
              fontSize="46px"
              onClick={()=>handleLikeButton("Sad")}
            />
            <IconButton
              aria-label="angry"
              icon={<FaAngry />}
              {...styles}
              bg="black"
              color="redAngry"
              fontSize="46px"
              onClick={()=>handleLikeButton("Angry")}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
export default ReactionButton;
