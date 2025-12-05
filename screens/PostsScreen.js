import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Image,
} from "react-native";
import { fetchPosts } from "../api/posts";

import avatarImg from "../assets/avatar.png";
import homeImg from "../assets/home.png";
import lpImg from "../assets/lp.png";
import urpalsImg from "../assets/urpals.png";
import userImg from "../assets/user.png";

export default function PostsScreen({ route, navigation }) {
  const { token, username } = route.params || {};
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("foru"); 

  const loadPosts = async (showLoading = true) => {
    if (!token) return;

    if (showLoading) setLoading(true);
    setError(null);

    try {
      const data = await fetchPosts(token, 1, 10);
      setPosts(data);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los posts.");
    } finally {
      if (showLoading) setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts(true);
  }, [token]);

  const onRefresh = () => {
    setRefreshing(true);
    loadPosts(false);
  };

  const renderItem = ({ item, index }) => {
    const isMine = username && item.username === username;
    const likesCount = Array.isArray(item.likes) ? item.likes.length : 0;

    const followLabel = isMine ? "U!" : index === 0 ? "Pal!" : "Seguir";

    return (
      <>
        <View style={styles.postRow}>
          <View style={styles.avatarCircle}>
            <Image source={avatarImg} style={styles.avatarImage} />
          </View>

          <View style={styles.postRight}>
            <View style={styles.postTopRow}>
              <Text style={styles.postUsername}>{item.username}</Text>

              {isMine ? (
                <View style={styles.actionsRow}>
                  <Text style={styles.actionIcon}>✏️</Text>
                  <Text style={styles.actionIcon}>🗑️</Text>
                  <View style={styles.badgeFilled}>
                    <Text style={styles.badgeFilledText}>U!</Text>
                  </View>
                </View>
              ) : followLabel === "Pal!" ? (
                <View style={styles.badgeFilled}>
                  <Text style={styles.badgeFilledText}>{followLabel}</Text>
                </View>
              ) : (
                <View style={styles.badgeOutline}>
                  <Text style={styles.badgeOutlineText}>{followLabel}</Text>
                </View>
              )}
            </View>

            <Text style={styles.postText}>{item.content}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString()
                  : "Fecha desconocida"}
              </Text>
              <Text style={styles.metaText}>Likes: {likesCount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            styles.tabLeft,
            tab === "foru" && styles.tabActive,
          ]}
          onPress={() => setTab("foru")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "foru" && styles.tabTextActive,
            ]}
          >
            ForU
          </Text>
          <Image source={homeImg} style={styles.tabIconImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            styles.tabRight,
            tab === "urpals" && styles.tabActive,
          ]}
          onPress={() => setTab("urpals")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "urpals" && styles.tabTextActive,
            ]}
          >
            UrPals
          </Text>
          <Image source={urpalsImg} style={styles.tabIconImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.topInfo}>
        {username && (
          <Text style={styles.welcome}>
            You! <Text style={{ fontWeight: "bold" }}>{username}</Text>
          </Text>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Cargando posts...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay posts para mostrar.</Text>
          }
        />
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomLeft} onPress={() => navigation.replace('Login')}>
          <Text style={styles.lpalsText}>LPals!</Text>
          <View style={styles.bottomLogo}>
            <Image source={lpImg} style={styles.bottomLogoImage} />
          </View>
        </TouchableOpacity>

        <View style={styles.bottomRight}>
          <View style={styles.bottomUserTextBox}>
            <Text style={styles.bottomUserText}>
              You!
            </Text>
          </View>
          <View style={styles.bottomUserIcon}>
            <Image source={userImg} style={styles.bottomUserImage} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.bigPlus}
          onPress={() => navigation.navigate('CreatePost', { token, username })}
        >
          <Text style={styles.bigPlusText}>+</Text>
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

  tabsContainer: {
    flexDirection: "row",
    width: "100%",
    height: 52,
    marginTop: 0,
    marginHorizontal: 0,
    backgroundColor: "#72A3FF",
    borderRadius: 0,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#72A3FF",
  },
  tabLeft: {
    borderRightWidth: 1,
    borderRightColor: "#72A3FF",
  },
  tabRight: {},
  tabActive: {
    backgroundColor: "#72A3FF",
  },
  tabText: {
    color: "#72A3FF",
    fontWeight: "600",
    fontSize: 14,
    marginRight: 6,
  },
  tabTextActive: {
    color: "#ffffff",
  },
  tabIconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  topInfo: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  welcome: {
    color: "#72A3FF",
    fontSize: 13,
    marginBottom: 4,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 90,
    paddingTop: 8,
  },
  postRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#72A3FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    overflow: "hidden",
  },
  avatarImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  postRight: {
    flex: 1,
  },
  postTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  postUsername: {
    flex: 1,
    color: "#72A3FF",
    fontWeight: "bold",
    fontSize: 14,
  },
  badgeFilled: {
    backgroundColor: "#72A3FF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  badgeFilledText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  badgeOutline: {
    borderColor: "#72A3FF",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  badgeOutlineText: {
    color: "#72A3FF",
    fontSize: 11,
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 14,
    marginHorizontal: 3,
    color: "#72A3FF",
  },
  postText: {
    fontSize: 13,
    color: "#72A3FF",
    marginTop: 3,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  metaText: {
    fontSize: 10,
    color: "#9aa3d0",
  },
  separator: {
    height: 1,
    backgroundColor: "#d4ddff",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#555",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: "#72A3FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  bottomLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  lpalsText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 8,
  },
  bottomLogo: {
    width: 40,
    height: 40,
    borderRadius: 6,      
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#72A3FF",  
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLogoImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  bottomRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomUserTextBox: {
    backgroundColor: "#72A3FF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
  },
  bottomUserText: {
    fontSize: 11,
    color: "#72A3FF",
    fontWeight: "600",
  },
  bottomUserIcon: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#72A3FF",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomUserImage: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  bigPlus: {
    position: "absolute",
    left: "55%",
    top: -24,
    transform: [{ translateX: -28 }],
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: "#f4f7ff",
    borderColor: "#72A3FF",
    borderWidth: 2,
    alignItems: "center",  
    justifyContent: "center",  
  },
  bigPlusText: {
    color: "#7faeff",
    fontSize: 34,
    lineHeight: 34,
    fontWeight: "bold",
  },
});
