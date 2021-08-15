import { Flex } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaThumbsUp, FaSmile, FaGrinSquint, FaSurprise, FaSadTear, FaAngry } from "react-icons/fa";
import { Post } from "../generated/graphql";

const styles = { 
    _hover: {},
    _active: {},
    _focus: {},
    borderRadius: "50%",
    w: "20px",
    h: "20px",
    justify: "center",
    align: "center"
  };

export const reactionOrder = (data: Post) => {
    const { like, love, care, haha, wow, sad, angry } = data;
    let my_reactions = [
      { key: "like", value: like, icon: <FaThumbsUp />, customStyles: {color: "textSecondary",
      bg: "active", fontSize: "10px",}},
      { key: "love", value: love, icon: <AiFillHeart />, customStyles: {color: "textSecondary",
      bg: "pinkLove", fontSize: "10px",}},
      { key: "care", value: care, icon: <FaSmile />, customStyles: {color: "yellowEmoji",
      bg: "secondary", fontSize: "18px",}},
      { key: "haha", value: haha, icon: <FaGrinSquint/>, customStyles: {color: "yellowEmoji",
      bg: "secondary", fontSize: "18px",}},
      { key: "wow", value: wow, icon: <FaSurprise />, customStyles: {color: "yellowEmoji",
      bg: "secondary", fontSize: "18px",}},
      { key: "sad", value: sad, icon: <FaSadTear />, customStyles: {color: "yellowEmoji",
      bg: "secondary", fontSize: "18px",}},
      { key: "angry", value: angry, icon: <FaAngry />, customStyles: {color: "redAngry",
      bg: "secondary", fontSize: "18px",} },
    ];

    my_reactions.sort((obj1, obj2) => {
      return obj2.value - obj1.value;
   });

   let my_buttons = [];
   if(my_reactions[0].value!=0)
    my_buttons.push(<Flex
      {...styles}
      {...my_reactions[0].customStyles}
      zIndex="3"
    >{my_reactions[0].icon}</Flex>)

    if(my_reactions[1].value!=0)
    my_buttons.push(<Flex
      {...styles}
      {...my_reactions[1].customStyles}
      zIndex="2"
      ml="-5px"
    >{my_reactions[1].icon}</Flex>)

    if(my_reactions[2].value!=0)
    my_buttons.push(<Flex
      {...styles}
      {...my_reactions[2].customStyles}
      zIndex="1"
      ml="-5px"
    >{my_reactions[2].icon}</Flex>)

    return my_buttons;
  };