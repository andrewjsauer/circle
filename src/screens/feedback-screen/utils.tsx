import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export const onDelete = async (meditationId) => {
  await storage().ref(`audio/${meditationId}.mp3`).delete();
};

export const onSave = async (
  id,
  data,
  feedback,
  { isSubscribed, numOfSubscriptionsLeft },
) => {
  const { type, userId } = data;
  const batch = firestore().batch();

  const userDocRef = firestore().collection("users").doc(userId);
  batch.update(userDocRef, {
    duration: firestore.FieldValue.increment(data.duration),
    meditations: firestore.FieldValue.arrayUnion(id),
  });

  if (!isSubscribed) {
    const subscriptionDocRef = firestore()
      .collection("subscriptions")
      .doc(userId);

    batch.update(subscriptionDocRef, {
      [type]: numOfSubscriptionsLeft - 1,
    });
  }

  const meditationDocRef = firestore().collection("meditations").doc(id);
  batch.set(meditationDocRef, { ...data, feedback });

  await batch.commit();
};
