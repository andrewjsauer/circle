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
    tokens: firestore.FieldValue.increment(data.usage.total_tokens),
  });

  if (!isSubscribed) {
    const subscriptionDocRef = firestore()
      .collection("subscriptions")
      .doc(userId);

    batch.update(subscriptionDocRef, {
      [type]: numOfSubscriptionsLeft - 1,
    });
  }

  const { content } = data;
  const meditationContentCollectionRef = firestore()
    .collection("meditations")
    .doc(id)
    .collection("content")
    .doc("content");
  batch.set(meditationContentCollectionRef, { content });

  const meditationData = {
    ...data,
    feedback,
  };

  delete meditationData.content;

  const meditationDocRef = firestore().collection("meditations").doc(id);
  batch.set(meditationDocRef, { ...meditationData });

  await batch.commit();
};
