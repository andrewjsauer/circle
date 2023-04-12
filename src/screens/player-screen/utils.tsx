import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export const onMeditationDelete = async (meditationId) => {
  await storage().ref(`audio/${meditationId}.mp3`).delete();
};

export const onMeditationSave = async (
  meditationId,
  meditationData,
  userId,
  duration,
) => {
  let metadata = {};

  if (!meditationData) {
    const response = await firestore()
      .collection("users")
      .doc(userId)
      .collection("meditations")
      .doc(meditationId)
      .get();

    metadata = { ...response.data() };
  } else {
    metadata = {
      ...meditationData,
      duration: duration === 0 ? 1 : duration,
      id: meditationId,
    };
  }

  await firestore()
    .collection("users")
    .doc(userId)
    .collection("meditations")
    .doc(meditationId)
    .set({
      ...metadata,
      id: meditationId,
    });

  await firestore().collection("meditations").doc(meditationId).set(metadata);
};
