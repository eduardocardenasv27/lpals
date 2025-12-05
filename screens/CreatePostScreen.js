import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createPost } from "../api/posts";

export default function CreatePostScreen({ route, navigation }) {
  const { token, username } = route.params || {};
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handlePublish = async () => {
    setError(null);
    setMessage(null);

    if (!content.trim()) {
      setError("Write something.");
      return;
    }

    try {
      setCreating(true);
      await createPost(token, content.trim());
      setContent("");
      setMessage("Publicado correctamente.");
      navigation.goBack();
    } catch (err) {
      setError(err.message || "No se pudo crear el post.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}> Regresar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {username && (
          <Text style={styles.youText}>
            You! <Text style={{ fontWeight: "bold" }}>{username}</Text>
          </Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Share what you like!"
          multiline
          value={content}
          onChangeText={setContent}
        />

        {error && <Text style={styles.error}>{error}</Text>}
        {message && <Text style={styles.message}>{message}</Text>}

        <TouchableOpacity
          style={styles.publishButton}
          onPress={handlePublish}
          disabled={creating}
        >
          <Text style={styles.publishText}>
            {creating ? "Sharing..." : "Share"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f1f3ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#72A3FF",
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 12,
  },
  backButton: {
    marginRight: 8,
  },
  backText: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  youText: {
    color: "#72A3FF",
    marginBottom: 8,
  },
  input: {
    minHeight: 120,
    borderRadius: 10,
    backgroundColor: "#72A3FF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#72A3FF",
  },
  error: {
    color: "red",
    marginTop: 8,
    fontSize: 12,
  },
  message: {
    color: "green",
    marginTop: 8,
    fontSize: 12,
  },
  publishButton: {
    marginTop: 16,
    alignSelf: "flex-end",
    backgroundColor: "#72A3FF",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
  },
  publishText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
