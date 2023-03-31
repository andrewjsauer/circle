import firestore from "@react-native-firebase/firestore";

export const updateUserEmail = async (user, userEmail) => {
  try {
    await user.updateEmail(userEmail);
    return true;
  } catch (error) {
    console.log("Update email failed", error);
    return false;
  }
};

export const checkUsername = async (username) => {
  const query = firestore()
    .collection("usernames")
    .where("displayName", "==", username);

  try {
    const usernameQuery = await query.get();

    usernameQuery.forEach((doc) => {
      const { displayName: otherDisplayName } = doc.data();

      if (otherDisplayName) {
        return false;
      }
    });

    return true;
  } catch (error) {
    console.log("Display name check failed", error);
    return false;
  }
};

export const updateUserProfile = async (user, username) => {
  try {
    await user.updateProfile({ displayName: username });
    return true;
  } catch (error) {
    console.log("Update user profile failed", error);
    return false;
  }
};

export const addUserProfile = (username) => {
  try {
    firestore().collection("usernames").add({
      displayName: username,
    });

    return true;
  } catch (error) {
    console.log("Update user profile failed", error);
    return false;
  }
};
