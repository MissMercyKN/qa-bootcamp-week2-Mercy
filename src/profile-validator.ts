type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};
// Case 1: Complete profile with notifications enabled
const userWithNotifications: UserProfile = {
  id: 1,
  username: "paul_qa",
  settings: {
    notifications: true,
  },
};

// Case 2: User has no 'settings' object at all
const userWithoutSettings: UserProfile = {
  id: 2,
  username: "new_shopper",
};

// Case 3: User has 'settings', but 'notifications' is missing inside it
const userWithoutNotificationFlag: UserProfile = {
  id: 3,
  username: "partial_profile",
  settings: {},
};

function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

console.log(`${userWithNotifications.username} notified?:`, isNotified(userWithNotifications));
console.log(`${userWithoutSettings.username} notified?:`, isNotified(userWithoutSettings));
console.log(`${userWithoutNotificationFlag.username} notified?:`, isNotified(userWithoutNotificationFlag));