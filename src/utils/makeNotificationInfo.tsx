import { Text } from "@chakra-ui/layout";
import { Notification, NotificationType } from "../generated/graphql";

export const makeNotificationInfo = (notification: Notification) => {
    const {triggerUser, info} = notification;
    let response = <Text></Text>;
    switch(notification.type){
        case NotificationType.Info: 
            response = <Text>{notification.info}</Text>;
            break;
        default: 
            response = <Text><strong>{triggerUser.username}</strong>{" "+info}</Text>;
    }
    return response;
}